"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingNotification = exports.createPostNotify = void 0;
const responseUtils_1 = require("../utils/responseUtils");
const socketIo_1 = require("../utils/socketIo");
const createPostNotify = async (req, res) => {
    const { userId, partnerId } = req.body;
    try {
        const roomId = `room_${userId}-${partnerId}`;
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
    const roomId = `room_${userId}-${partnerId}`;
    const partnerSocketId = await (0, socketIo_1.getUserSocketId)(partnerId);
    const socket2 = global._io.sockets.sockets.get(partnerSocketId || partnerId);
    console.log('it is heare', socket2.id, partnerSocketId, partnerId);
    // if (!global._io.sockets.adapter.rooms.get(roomId)) {
    //   socket2.join(roomId);
    // }
    global._io.to(socket2.id).emit('message', { data: 'love' });
};
exports.BookingNotification = BookingNotification;
//# sourceMappingURL=testSocketIo.js.map