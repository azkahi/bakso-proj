import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'

const JWT_SECRET_KEY = process.env.SECRET;

const ALLOWED_ORIGINS = ['https://alim.center'];

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    
    // Attach the decoded token to the request object for use in subsequent middleware or route handlers
    (req as any).user = decoded;

    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

export const originValidator = (req: Request, res: Response, next: NextFunction) => {
  const origin = req.get('Origin') || req.get('Referer');

  if (!origin) {
    res.status(400).json({ message: 'Origin header is missing' });
  }

  try {
    const url = new URL(origin);
    if (ALLOWED_ORIGINS.includes(url.origin)) {
      next();
    } else {
      res.status(403).json({ message: 'Origin not allowed' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid Origin header' });
  }
};