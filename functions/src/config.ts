export const CLIENT_URL: string =
  process.env.NODE_ENV !== 'development'
    ? process.env.CLIENT_PROD_URL as string
    : process.env.CLIENT_DEV_URL as string;

export const GOOGLE_CREDENTIALS = JSON.parse(
  Buffer.from(process.env.GOOGLE_CREDENTIALS as string, 'base64').toString('utf-8')
);

export const GOOGLE_SHEETS_ID: string = process.env.GOOGLE_SHEETS_ID as string;
