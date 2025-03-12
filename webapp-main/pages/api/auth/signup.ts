import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import axios from 'axios';

const JSON_SERVER_URL = 'http://localhost:3001/users';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    if (method === 'POST') {
        const { email, password, name } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const response = await axios.post(JSON_SERVER_URL, {
            email,
            password: hashedPassword,
            name,
        });

        if (response.status === 201) {
            return res.status(201).json({ message: 'User created' });
        } else {
            return res.status(500).json({ message: 'Error creating user' });
        }
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}