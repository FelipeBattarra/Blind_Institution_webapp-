import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import axios from 'axios';

const SECRET_KEY = 'aaa';
const JSON_SERVER_URL = 'http://localhost:3001/users';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    if (method === 'POST') {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const response = await axios.get(`${JSON_SERVER_URL}?email=${email}`);
        const users = response.data;

        if (users.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = users[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
        // Salvar o token nos cookies, com httpOnly e secure
        res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Secure; Path=/; Max-Age=3600;`);

        return res.status(200).json({ message: 'Login successful', token });
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}