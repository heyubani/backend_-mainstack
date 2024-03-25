import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config';

export const generateToken = (payload: any): string => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
};