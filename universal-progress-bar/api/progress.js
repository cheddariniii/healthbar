// api/progress.js

// Placeholder for in-memory storage; replace with a persistent database for production
let progress = {
    health: 100,
    scare: 100,
    feed: 100,
};

export default async function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).json(progress);
    } else if (req.method === 'POST') {
        const { type, value } = req.body;
        if (progress[type] !== undefined) {
            progress[type] = Math.max(0, Math.min(100, progress[type] + value));
            res.status(200).json({ message: `${type} updated`, progress });
        } else {
            res.status(400).json({ error: 'Invalid progress type' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
