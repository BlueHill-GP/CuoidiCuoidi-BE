import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import logger, { expressLogger } from './logger';
import connectDB from './config/db';

import authRouter from './router/auth';
import postRouter from './router/post';

mongoose.set('strictQuery', false);
connectDB();

const app = express();
app.use(expressLogger);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 3000;

app.get('/', (req, res) => {
  res.send('May be i love you all ❤️');
});
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);

app.listen(PORT, () => {
  console.log('love u');
  return console.log(`Express is listening at http://localhost:${PORT}`);
});
