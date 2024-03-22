import jwt from 'jsonwebtoken';

export const generateToken = (payload: any): string => {
    return jwt.sign(payload, 'yourSecretKey', { expiresIn: '1h' });
};