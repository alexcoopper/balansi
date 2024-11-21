import { Request, Response } from 'express';
import { sheets_v4 } from 'googleapis';
import { MainSheetName, ViewOnlySheetName } from './constants';

export const sheetDataHandler = async (
  req: Request,
  res: Response,
  sheets: sheets_v4.Sheets
): Promise<void> => {
  try {
    const startRow = parseInt(req.query.startRow as string, 10) + 1 || 2;
    const rowsCount = parseInt(req.query.rowsCount as string, 10) || 10;
    const endRow = startRow + rowsCount - 1;

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID as string,
      range: `${ViewOnlySheetName}!A${startRow}:P${endRow}`,
    });

    if (!response.data.values) {
      res.status(404).json({ message: 'No data found in the specified range' });
      return;
    }

    res.json(response.data.values);
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
    res.status(500).json({ message: 'Error fetching data from Google Sheets' });
  }
};

export const updateTransactionHandler = async (
  req: Request,
  res: Response,
  sheets: sheets_v4.Sheets
): Promise<void> => {
  const { rowIndex, ...transactionData } = req.body;

  if (!rowIndex || !transactionData) {
    res.status(400).json({ message: 'Row number and values to update are required' });
    return;
  }

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID as string,
      range: `${MainSheetName}!A${rowIndex}:D${rowIndex}`,
    });

    const rowData = response.data.values ? response.data.values[0] : null;

    if (!rowData) {
      res.status(404).json({ message: 'Row data not found' });
      return;
    }

    const [rowDate, rowDescription, rowSum, rowOwner] = rowData;
    const rowSumParsed = parseFloat(rowSum.replace(',', ''));
    const transactionSumParsed = parseFloat(transactionData.sum.toFixed(2));

    if (rowSumParsed !== transactionSumParsed || rowOwner !== transactionData.owner) {
      res.status(409).json({
        message: 'Data mismatch. The row data has changed.',
        details: { currentRowData: rowData, updatedTransactionData: transactionData },
      });
      return;
    }

    const updateRequests = [
      { range: `${MainSheetName}!F${rowIndex}`, values: [[transactionData.forMe || '']] },
      { range: `${MainSheetName}!G${rowIndex}`, values: [[transactionData.forBrother || '']] },
      { range: `${MainSheetName}!I${rowIndex}`, values: [[transactionData.isOur ? 'TRUE' : 'FALSE']] },
      { range: `${MainSheetName}!L${rowIndex}`, values: [[transactionData.comment]] },
      { range: `${MainSheetName}!P${rowIndex}`, values: [[transactionData.isBlocked ? 'TRUE' : 'FALSE']] },
    ];

    await sheets.spreadsheets.values.batchUpdate({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID as string,
      requestBody: { valueInputOption: 'USER_ENTERED', data: updateRequests },
    });

    res.status(200).json({ message: 'Transaction updated successfully' });
  } catch (error) {
    console.error('Error updating transaction:', error);
    res.status(500).json({ message: 'Error updating transaction' });
  }
};
