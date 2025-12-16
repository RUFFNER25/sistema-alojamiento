import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes';
import listingRoutes from './routes/listing.routes';
import bookingRoutes from './routes/booking.routes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  console.error('Falta la variable de entorno MONGODB_URI');
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch((err) => {
    console.error('Error conectando a MongoDB Atlas', err);
    process.exit(1);
  });

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/auth', authRoutes);
app.use('/listings', listingRoutes);
app.use('/bookings', bookingRoutes);

app.listen(PORT, () => {
  console.log(`Backend escuchando en puerto ${PORT}`);
});
