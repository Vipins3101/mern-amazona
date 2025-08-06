import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log(error.message); // ✅ correct usage
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/keys/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

console.log('Mounting /api/seed');
app.use('/api/seed', seedRouter);

console.log('Mounting /api/products');
app.use('/api/products', productRouter);

console.log('Mounting /api/users');
app.use('/api/users', userRouter);

console.log('Mounting /api/orders');
app.use('/api/orders', orderRouter);

// app.use('/api/seed', seedRouter);
// app.use('/api/products', productRouter);
// app.use('/api/users', userRouter);
// app.use('/api/orders', orderRouter);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, './frontend/build')));

app.get(/('*')/, (req, res) =>
  res.sendFile(path.join(__dirname, './frontend/build/index.html'))
);
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});
