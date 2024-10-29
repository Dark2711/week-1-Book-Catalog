import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const connectDB = () => {
  mongoose
    .connect(process.env.DATABASE_URL || '')
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.log('Failed to connect to MongoDB', err);
    });
};
export default connectDB;
