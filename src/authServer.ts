import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import logger, { expressLogger } from './config/logger';
import connectDB from './config/db';

import authRouter from './router/auth';

mongoose.set('strictQuery', false);
connectDB();

const app = express();
app.use(expressLogger);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 3004;

app.get('/', (req, res) => {
  res.send('May be i love you ❤️');
});
app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  console.log('love u');
  return console.log(`Express is listening hr at http://localhost:${PORT}`);
});
