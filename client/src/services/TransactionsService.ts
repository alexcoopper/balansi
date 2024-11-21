// src/fetchData.ts

import { API } from '../libs/api';
import { mapToTransactionType, Transaction } from '../models';

const rowsCount = 20;

const fetchData = async (startRow: number): Promise<Transaction[]> => {
  try {
    const rawRows = await API.fetchSheetData(startRow, rowsCount);
    
    const newRows = rawRows.map((row: any): Transaction => ({
      date: new Date(row[0]),
      description: row[1],
      sum: parseFloat(row[2].replace(',', '')),
      owner: row[3],
      inOut: mapToTransactionType(row[4]),
      forMe: row[5] ? parseFloat(row[5]) : 0,
      forBrother: row[6] ? parseFloat(row[6]) : 0,
      common: row[7] ? parseFloat(row[7]) : 0,
      isOur: row[8] === "TRUE",
      isDone: row[9] === "TRUE",
      category: row[10],
      comment: row[11],
      rowIndex: row[14],
      isBlocked: row[15] === "TRUE",
    }));

    return newRows;
  } catch (error) {
    console.error("Error processing fetched data:", error);
    return [];
  }
};

export const updateTransaction = async (transaction: Transaction): Promise<void> => {
    await API.updateTransactionAsync(transaction);
};


export const TransactionsService = {
    fetchData,
    updateTransaction
};
