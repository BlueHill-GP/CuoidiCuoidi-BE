"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserSocketRepository_1 = __importDefault(require("../repositories/UserSocketRepository"));
const message_1 = require("../sockets/message");
const post_1 = require("../sockets/post");
const ObjectID = require('mongodb').ObjectID;
class SocketService {
    connection(socket) {
        (0, post_1.handlePost)(socket, global._io);
        (0, message_1.handleMess)(socket, global._io);
        console.log(socket.id, ' :connect');
        socket.on('disconnect', () => {
            console.log(socket.id, ' :disconnected');
        });
        socket.on('user-connect', (userId) => {
            console.log('User ID:', userId);
            UserSocketRepository_1.default.set({ userId, userSocketId: socket.id });
        });
        // socket.on('create-room', ({ userId, partnerId }) => {
        //   const roomId = `${userId}-${partnerId}`;
        //   // Check if room already exists
        //   if (global._io.sockets.adapter.rooms.get(roomId)) {
        //     console.log(`Room ${roomId} already exists`);
        //     socket.emit('room-exists', { roomId });
        //     return;
        //   }
        //   const socket2 = global._io.sockets.sockets.get(partnerId);
        //   socket.join(roomId);
        //   socket2.join(roomId);
        //   console.log(`User with id: ${socket.id} created room: ${roomId}`);
        //   // global._io.to(roomId).emit('room-created', { roomId, userId, partnerId });
        //   global._io.to(roomId).emit('message', { data: "nice to meet you!!!" });
        // });
        // socket.on('send-message', (data) => {
        //   global._io.to(data.roomId).emit('message', { data: data.message });
        // });
    }
}
exports.default = SocketService;
//# sourceMappingURL=notification.service.js.map