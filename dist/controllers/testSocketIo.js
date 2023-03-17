"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPostNotify = void 0;
const responseUtils_1 = require("../utils/responseUtils");
const createPostNotify = async (req, res) => {
    const { userId, partnerId } = req.body;
    // global._io.emit('create-room', { userId: userId, partnerId: partnerId });
    try {
        const roomId = `${userId}-${partnerId}`;
        const socket = global._io.sockets.sockets.get(userId);
        // Check if room already exists
        if (global._io.sockets.adapter.rooms.get(roomId)) {
            console.log(`Room ${roomId} already exists`);
            socket.emit('room-exists', { roomId });
            return;
        }
        const socket2 = global._io.sockets.sockets.get(partnerId);
        socket.join(roomId);
        socket2.join(roomId);
        console.log(`User with id: ${socket.id} created room: ${roomId}`);
        // global._io.to(roomId).emit('room-created', { roomId, userId, partnerId });
        global._io.to(roomId).emit('message', { data: 'love' });
        // const results = await Promise.all(files.map(uploadImage));
        (0, responseUtils_1.createResponse)(res, 200, false, 'good');
    }
    catch (error) {
        console.log(error);
        return (0, responseUtils_1.createResponse)(res, 500, false, 'Internal Server Error');
    }
};
exports.createPostNotify = createPostNotify;
//# sourceMappingURL=testSocketIo.js.map