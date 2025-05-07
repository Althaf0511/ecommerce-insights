import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGO_URL;

    if (!mongoURI) {
      throw new Error('MONGO_URL is not defined in environment variables');
    }

    const conn = await mongoose.connect(mongoURI);
    console.info(`✅ MongoDB connected: ${conn.connection.name}`);
  } catch (err) {
    if (err instanceof Error) {
      console.error('❌ DB connection error:', err.message);
    } else {
      console.error('❌ Unknown DB connection error:', err);
    }
    process.exit(1);
  }
};

export default connectDB;
