// server/src/auth.ts

import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';

const allowedUsers: { [key: string]: string } = process.env.ALLOWED_USERS
  ? process.env.ALLOWED_USERS.split(',')
      .map(user => {
        const [username, password] = user.split(':');
        return [username, password];
      })
      .reduce<{ [key: string]: string }>((acc, [username, password]) => {
        if (username && password) { // Only add if both parts are defined
          acc[username] = password;
        }
        return acc;
      }, {})
  : {};

export const validateUserCredentials = (username: string, password: string): boolean => {
  return allowedUsers[username] === password;
};


export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies.__session;
  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err: VerifyErrors | null) => {
    if (err) {
      res.status(403).json({ message: 'Forbidden' });
      return;
    }
    next(); // Proceed to the next middleware if verification is successful
  });
};
