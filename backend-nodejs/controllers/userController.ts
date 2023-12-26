import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { User } from '../models/user'; // Assuming you have a User model

const SECRET_KEY = 'onePiece'; // Replace with your secret key

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log(req.body)
        const { username, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            res.status(409).send('User already exists');
            return;
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate a unique userId
        const userId = uuidv4();

        // Create new user with the generated userId
        const newUser = await User.create({ userId, username, password: hashedPassword });

        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering new user');
    }
};
export const getUsername = async (req, res) => {
    try {
        const userId = req.userId; // Assuming req.userId is set by your auth middleware
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ username: user.username });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;

        // Find user by username
        const user = await User.findOne({ where: { username } });
        if (!user) {
            res.status(401).send('Invalid credentials');
            return;
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).send('Invalid credentials');
            return;
        }

        // Generate token
        const token = jwt.sign({ userId: user.userId }, SECRET_KEY, { expiresIn: '24h' });

        res.json({ token });
    } catch (error) {
        res.status(500).send('Error logging in');
    }
};
