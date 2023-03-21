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
import UserRouter from './router/user';
import paymentRouter from './router/payment';
import SocketRouter from './router/socketIo';
import SocketUser from './repositories/UserSocketRepository';
import http from 'http';
import { Server, Socket } from 'socket.io';
import { handlePost } from './sockets/post';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import SocketService from './services/notification.service';

mongoose.set('strictQuery', false);
connectDB();

const app = express();
app.use(expressLogger);
app.use(cors());
app.use(fileUpload());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});
const socketService = new SocketService();

global._io = io;

global._io.on('connection', socketService.connection);

// call the connection method to set up the socket connection
;

// io.on('connection', (socket) => {
//   console.log('User connected with socket ID:', socket.id);

//   socket.on('user-connect', () => {
//     const userId = socket.id;
//     console.log('User ID:', userId);
//     SocketUser.set({ userId, userSocketId: socket.id });

//   });

//   socket.on('create-room', ({ userId, partnerId }) => {
//     const roomId = `${userId}-${partnerId}`;

//     // Check if room already exists
//     if (io.sockets.adapter.rooms.get(roomId)) {
//       console.log(`Room ${roomId} already exists`);
//       socket.emit('room-exists', { roomId });
//       return;
//     }
//     const socket2 = io.sockets.sockets.get(partnerId);
//     socket.join(roomId);
//     socket2.join(roomId);

//     console.log(`User with id: ${socket.id} created room: ${roomId}`);
//     io.to(roomId).emit('room-created', { roomId, userId, partnerId });
//   });

//   socket.on('send-message', (data) => {
//     io.to(data.roomId).emit('message', { data: data.message });
//   })

//   handlePost(socket,io)
// });

io.listen(Number(process.env.SOCKET_IO_PORT) || 1234);
const PORT = 4000;

app.get('/', (req, res) => {
  res.send('I love you all ❤️');
});
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
app.use('/api/service-packages', servicePackagesRouter);
app.use('/api/booking', bookingRouter);
app.use('/api/user', UserRouter);
app.use('/api/payment', paymentRouter);
app.use('/api/socket', SocketRouter);
app.use(express.static('public'));

app.listen(PORT, () => {
  console.log('love u');
  return console.log(`Express is listening at http://localhost:${PORT}`);
});
function authenticateUser(
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) {
  throw new Error('Function not implemented.');
}
