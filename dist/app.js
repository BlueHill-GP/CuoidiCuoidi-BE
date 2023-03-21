"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cors_1 = __importDefault(require("cors"));
const logger_1 = require("./config/logger");
const db_1 = __importDefault(require("./config/db"));
const auth_1 = __importDefault(require("./router/auth"));
const post_1 = __importDefault(require("./router/post"));
const servicePackage_1 = __importDefault(require("./router/servicePackage"));
const booking_1 = __importDefault(require("./router/booking"));
const user_1 = __importDefault(require("./router/user"));
const payment_1 = __importDefault(require("./router/payment"));
const socketIo_1 = __importDefault(require("./router/socketIo"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const notification_service_1 = __importDefault(require("./services/notification.service"));
mongoose_1.default.set('strictQuery', false);
(0, db_1.default)();
const app = (0, express_1.default)();
app.use(logger_1.expressLogger);
app.use((0, cors_1.default)());
app.use((0, express_fileupload_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
    },
});
const socketService = new notification_service_1.default();
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
app.use('/api/auth', auth_1.default);
app.use('/api/posts', post_1.default);
app.use('/api/service-packages', servicePackage_1.default);
app.use('/api/booking', booking_1.default);
app.use('/api/user', user_1.default);
app.use('/api/payment', payment_1.default);
app.use('/api/socket', socketIo_1.default);
app.use(express_1.default.static('public'));
app.listen(PORT, () => {
    console.log('love u');
    return console.log(`Express is listening at http://localhost:${PORT}`);
});
function authenticateUser(socket) {
    throw new Error('Function not implemented.');
}
//# sourceMappingURL=app.js.map