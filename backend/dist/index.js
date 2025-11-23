import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnection from './db.js';
import catagories from './routes/categories.route.js';
import subcategories from './routes/subcategories.route.js';
import duas from './routes/duas.route.js';
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use('/api/categories', catagories);
app.use('/api/subcategories', subcategories);
app.use('/api/duas', duas);
app.get('/', (req, res) => res.json({ ok: true, message: 'Dua backend running' }));
try {
    await dbConnection();
    console.log('Database connected successfully');
}
catch (error) {
    console.error('Failed to connect to the database:', error);
}
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
