"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendDataBooking = exports.sendDataAndNotification = exports.notification = exports.BookingNotification = exports.createPostNotify = void 0;
const responseUtils_1 = require("../utils/responseUtils");
const socketIo_1 = require("../utils/socketIo");
const createPostNotify = async (req, res) => {
    const { userId, partnerId } = req.body;
    try {
        // const roomId = `room_${userId}-${partnerId}`;
        const partnerSocketId = await (0, socketIo_1.getUserSocketId)(partnerId);
        const socket2 = global._io.sockets.sockets.get(partnerSocketId || partnerId);
        // if (!global._io.sockets.adapter.rooms.get(roomId)) {
        //   socket2.join(roomId);
        // }
        global._io.to(socket2.id).emit('message', { data: 'love' });
        (0, responseUtils_1.createResponse)(res, 200, false, 'good');
    }
    catch (error) {
        console.log(error);
        return (0, responseUtils_1.createResponse)(res, 500, false, 'Internal Server Error');
    }
};
exports.createPostNotify = createPostNotify;
const BookingNotification = async (userId, partnerId) => {
    //  const roomId = `room_${userId}-${partnerId}`;
    //  const partnerSocketId = await getUserSocketId(partnerId);
    // const socket2 = global._io.sockets.sockets.get(partnerSocketId || partnerId);
    // console.log(roomId);
    // console.log(socket2.id);
    //  global._io.to(socket2.id).emit('message', { data: 'love' });
    const partnerSocketId = await (0, socketIo_1.getUserSocketId)(partnerId);
    const socket2 = global._io.sockets.sockets.get(partnerSocketId || partnerId);
    // if (!global._io.sockets.adapter.rooms.get(roomId)) {
    //   socket2.join(roomId);
    // }
    global._io.to(socket2.id).emit('message', { data: 'love' });
};
exports.BookingNotification = BookingNotification;
const notification = async (receiver, message) => {
    const partnerSocketId = await (0, socketIo_1.getUserSocketId)(receiver);
    const socket2 = global._io.sockets.sockets.get(partnerSocketId || receiver);
    console.log(message);
    if (socket2) {
        console.log(message, socket2.id);
        global._io.to(socket2.id).emit('message', { data: message });
    }
};
exports.notification = notification;
const sendDataAndNotification = async (sender, receiver, message, data) => {
    try {
        const senderSocketId = await (0, socketIo_1.getUserSocketId)(sender);
        const receiverSocketId = await (0, socketIo_1.getUserSocketId)(receiver);
        const socket1 = global._io.sockets.sockets.get(senderSocketId || sender);
        const socket2 = global._io.sockets.sockets.get(receiverSocketId || receiver);
        global._io.to(socket1.id).emit('update-booking', { data: data });
        global._io.to(socket2.id).emit('update-booking', { data: data });
        global._io.to(socket2.id).emit('message', { data: message });
    }
    catch (error) {
        console.log(error);
    }
};
exports.sendDataAndNotification = sendDataAndNotification;
const sendDataBooking = async (receiver, data) => {
    try {
        const receiverSocketId = await (0, socketIo_1.getUserSocketId)(receiver);
        const socket2 = global._io.sockets.sockets.get(receiverSocketId || receiver);
        console.log('uar', data);
        global._io.to(socket2.id).emit('new-booking', { data: data });
    }
    catch (error) {
        console.log(error);
    }
};
exports.sendDataBooking = sendDataBooking;
//# sourceMappingURL=testSocketIo.js.map