import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import logger, { expressLogger } from './config/logger';
import connectDB from './config/db';

import authRouter from './router/auth';
import postRouter from './router/post';
import servicePackagesRouter from './router/servicePackage';
import bookingRouter from './router/booking';

mongoose.set('strictQuery', false);
connectDB();

const app = express();
app.use(expressLogger);
app.use(cors());
app.use(fileUpload());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 4000;

app.get('/', (req, res) => {
  res.send('I love you all ❤️');
});
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
app.use('/api/service-packages', servicePackagesRouter);
app.use('/api/booking', bookingRouter);

app.listen(PORT, () => {
  console.log('love u');
  return console.log(`Express is listening at http://localhost:${PORT}`);
});
