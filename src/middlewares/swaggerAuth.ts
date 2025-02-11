import { Request, Response, NextFunction } from 'express';

export const swaggerAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.query.token || req.query.token !== 'your-secret-token') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};