import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.json({ status: 200, message: 'API is running' });
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
