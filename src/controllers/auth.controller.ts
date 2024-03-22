import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import userSchema from '../models/user.model';
import { generateToken } from '../utils/';

export const signUp = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const existingUser = await userSchema.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                status: 'error',
                code: 400,
                message: 'Account already exists.',
            });
        }
        const newUser = new userSchema({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ 
            status: 'success',
            code: 201,
            message: 'Account created successfully',
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        const user = await userSchema.findOne({ email });
        if (!user) throw new Error('User not found.');

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) throw new Error('Invalid password.');

        const token = generateToken({ username: user.username, email });
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
