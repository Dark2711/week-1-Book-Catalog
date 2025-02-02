import express from 'express';
import cors from 'cors';
import mainRouter from './routes/main.route';
import connectDB from './db/db.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

//connect to mongoDB
connectDB();
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api/v1', mainRouter);

app.listen(process.env.PORT, () =>
  console.log(`Server is running on PORT: ${process.env.PORT}`),
);
