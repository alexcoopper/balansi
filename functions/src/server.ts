import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { google } from 'googleapis';
import { authenticateToken } from './auth';
import { loginHandler } from './authHandlers';
import { CLIENT_URL, GOOGLE_CREDENTIALS } from './config';
import { sheetDataHandler, updateTransactionHandler } from './sheetHandlers';
import admin from 'firebase-admin';

// Initialize Express app
const app = express();

// Middleware configuration
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Google Sheets API initialization
const auth = new google.auth.JWT(
  GOOGLE_CREDENTIALS.client_email,
  undefined,
  GOOGLE_CREDENTIALS.private_key,
  ['https://www.googleapis.com/auth/spreadsheets']
);
const sheets = google.sheets({ version: 'v4', auth });

// Auth routes
app.post('/auth/login', (req: Request, res: Response) => loginHandler(req, res));

app.get('/auth/status', authenticateToken, (req: Request, res: Response) => {
  res.status(200).json({ loggedIn: true, message: 'User is logged in' });
});

// Sheet routes
app.get('/api/sheetdata', authenticateToken, (req: Request, res: Response) => sheetDataHandler(req, res, sheets));
app.post('/api/transaction/update', authenticateToken, (req: Request, res: Response) => updateTransactionHandler(req, res, sheets));

const serviceAccount = JSON.parse(Buffer.from(process.env.FIRESTORE_SERVICE_ACCOUNT!, 'base64').toString());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firestore = admin.firestore();

app.post('/api/firestore/add', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { collection, document, data } = req.body;

    if (!collection || !document || !data) {
      return res.status(400).json({ message: 'Missing collection, document, or data in the request body' });
    }

    // Add data to Firestore
    await firestore.collection(collection).doc(document).set(data);

    res.status(200).json({ message: 'Data added successfully to Firestore', data });
  } catch (error) {
    console.error('Error adding data to Firestore:', error);
    res.status(500).json({ message: 'Failed to add data to Firestore', error });
  }
});


app.get('/api/menu', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { startDay } = req.query;
    if (!startDay) {
      return res.status(400).json({ message: 'Missing startDay parameter' });
    }

    const startDate = new Date(startDay as string);
    const daysOfWeek = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      return `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    });

    console.log(daysOfWeek);
    const menus: any[] = [];
    for (const day of daysOfWeek) {
      const docRef = firestore.collection('Menu').doc(day);
      const doc = await docRef.get();
      if (doc.exists) {
        menus.push(doc.data());
      } else {
        menus.push({ day, lunch: {description: '', type:'lunch'}, dinner: {description: '', type:'dinner'} }); // Return an empty structure if no document exists
      }
    }

    res.status(200).json(menus);
  } catch (error) {
    console.error('Error fetching menu:', error);
    res.status(500).json({ message: 'Failed to fetch menu', error });
  }
});

/**
 * Update a specific day's menu
 */
app.post('/api/menu', authenticateToken, async (req: Request, res: Response) => {
  try {
    const menuDay = req.body;
    if (!menuDay || !menuDay.day || !menuDay.lunch || !menuDay.dinner) {
      return res.status(400).json({ message: 'Missing day or meals in the request body' });
    }

    const docRef = firestore.collection('Menu').doc(menuDay.day);
    await docRef.set(menuDay);

    res.status(200).json({ message: 'Menu updated successfully', data: menuDay });
  } catch (error) {
    console.error('Error updating menu:', error);
    res.status(500).json({ message: 'Failed to update menu', error });
  }
});

/**
 * Add a full week's menu
 */
app.post('/api/menu/addweek', authenticateToken, async (req: Request, res: Response) => {
  try {
    const menuWeek = req.body;
    if (!Array.isArray(menuWeek) || menuWeek.length === 0) {
      return res.status(400).json({ message: 'Invalid menuWeek data in the request body' });
    }

    const batch = firestore.batch();
    menuWeek.forEach((menuDay: any) => {
      if (!menuDay.day || !menuDay.lunch || !menuDay.dinner) {
        throw new Error('Each menuDay must have a "day" and "meals" field');
      }
      const docRef = firestore.collection('Menu').doc(menuDay.day);
      batch.set(docRef, menuDay);
    });

    await batch.commit();

    res.status(200).json({ message: 'Week menu added successfully', data: menuWeek });
  } catch (error) {
    console.error('Error adding week menu:', error);
    res.status(500).json({ message: 'Failed to add week menu', error });
  }
});


app.get('/api/shopping-list', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { startDay } = req.query;
    if (!startDay) {
      return res.status(400).json({ message: 'Missing startDay parameter' });
    }

    const docRef = firestore.collection('ShoppingList').doc(startDay as string);
    const doc = await docRef.get();

    if (doc.exists) {
      res.status(200).json(doc.data());
    } else {
      res.status(200).json({ startDay, data: [] }); // Return an empty list if no document exists
    }
  } catch (error) {
    console.error('Error fetching shopping list:', error);
    res.status(500).json({ message: 'Failed to fetch shopping list', error });
  }
});


app.post('/api/shopping-list', authenticateToken, async (req: Request, res: Response) => {
  try {
    const shoppingList = req.body;
    if (!shoppingList || !shoppingList.day || !Array.isArray(shoppingList.data)) {
      return res.status(400).json({ message: 'Invalid shopping list data in the request body' });
    }

    const docRef = firestore.collection('ShoppingList').doc(shoppingList.day);
    await docRef.set(shoppingList);

    res.status(200).json({ message: 'Shopping list updated successfully', data: shoppingList });
  } catch (error) {
    console.error('Error updating shopping list:', error);
    res.status(500).json({ message: 'Failed to update shopping list', error });
  }
});


// Local development
if (process.env.NODE_ENV === 'development') {
  const PORT = process.env.PORT || 3002;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Firebase Functions Export
export default app;
