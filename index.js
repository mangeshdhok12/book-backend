import express from 'express';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();


app.use(express.json());


app.use(cors());

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  })
);

app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Welcome To MERN Stack Tutorial');
});

app.use('/books', booksRoute);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('App connected to database');
    app.listen(process.env.PORT, () => {
      console.log(`App is listening to port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
