import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth/authService';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authService = AuthService.getInstance();
    const token = await authService.getToken();
    
    req.headers.authorization = `Bearer ${token}`;
    next();
  } catch (error) {
    next(error);
  }
};