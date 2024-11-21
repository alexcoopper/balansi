import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { validateUserCredentials } from './auth';

export const loginHandler = (req: Request, res: Response): void => {
  const { username, password } = req.body;

  if (validateUserCredentials(username, password)) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET as string, { expiresIn: '24h' });
    res.cookie('__session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: process.env.NODE_ENV !== 'development' ? 'none' : 'lax',
      path: '/',
    });
    res.status(200).json({ status: true });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};
