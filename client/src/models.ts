
export enum Owner {
  Oleksii = 'Oleksii',
  Dmytro = 'Dmytro',
}

export type Transaction = {
  date: Date;
  description: string;
  sum: number;
  owner: Owner;
  inOut: TransactionType;
  forMe: number;
  forBrother: number;
  common: number;
  isOur: boolean;
  isDone: boolean;
  category: string;
  comment: string;
  rowIndex: number;
  isBlocked: boolean;
};

export function generateTransactionId(transaction: Transaction): string {
  return `${transaction.date.toISOString()}-${transaction.sum}-${transaction.owner}`;
}

export enum TransactionType {
  Income = 'income',
  Outcome = 'outcome',
}

export function mapToTransactionType(value: string): TransactionType {
  if (value.toLowerCase() === 'income') {
    return TransactionType.Income;
  } else if (value.toLowerCase() === 'outcome') {
    return TransactionType.Outcome;
  }
  throw new Error(`Unknown transaction type: ${value}`);
}

export enum MenuOwner {
  Liza = 'Liza',
  Anna = 'Anna',
}

export enum DayOfWeek {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday',
}

export enum MealType {
  Lunch = 'lunch',
  Dinner = 'dinner',
}

export type MenuItem = {
  description: string;
  owner?: MenuOwner;
  type: MealType;
  products: ShoppingItem[];
};

export type MenuDay = {
  day: string;
  lunch: MenuItem;
  dinner: MenuItem;
  isNew?: boolean;
};

export type ShoppingItem = {
  name: string;
  bought: boolean;
  meals?: string[];
};

export type ShoppingList = {
  day: string;
  data: ShoppingItem[];
};
