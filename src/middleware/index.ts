import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import { SECRET_KEY } from '../config';

declare module 'express' {
    interface Request {
        user?: any;
    }
}
  
export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            status: 'error',
            statusCode: 401,
            message: 'Access denied. No token provided.',
        });
    }

    try {
        const decoded: any = jwt.verify(token, SECRET_KEY);
        const userDetails: any = await User.findOne({ email: decoded.email });
        if (!userDetails) {
            return res.status(400).json({
                status: 'error',
                code: 400,
                message: 'Invalid or expired token'
            });
        }
        delete userDetails.password;
        req.user = userDetails;
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                status: 'error',
                statusCode: 401,
                message: 'Token expired',
            });
        }
        return res.status(401).json({
            status: 'error',
            statusCode: 401,
            message: 'Invalid token',
        });
    }
};
