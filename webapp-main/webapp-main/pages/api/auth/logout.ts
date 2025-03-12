import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    if (method === 'POST') {
        // Remover o cookie de autenticação
        res.setHeader('Set-Cookie', 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT');
        return res.status(200).json({ message: 'Logout successful' });
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}