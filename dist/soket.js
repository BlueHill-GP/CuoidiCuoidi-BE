"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleConnection = (io) => {
    io.on('connection', (socket) => {
        console.log(`Socket connected: ${socket.id}`);
        socket.on('send-message', ({ message, recipientId, senderId }) => {
            console.log(`Received message from ${senderId} to ${recipientId}: ${message}`);
            // Check if the room already exists
            const roomName = `room-${senderId}-${recipientId}`;
            const room = io.sockets.adapter.rooms.get(roomName);
            if (!room) {
                // Create a new room and join it
                socket.join(roomName);
                console.log(`Created room ${roomName}`);
                // Notify the sender that they have joined a new room
                socket.emit('room-created', roomName);
                // Notify the recipient that they have been invited to a new room
                io.to(`user-${recipientId}`).emit('room-invitation', {
                    roomName,
                    senderId,
                    message,
                });
                // Add the recipient to the room
                io.in(roomName).emit('user-joined', `user-${recipientId}`, roomName);
            }
            else {
                // Join the existing room
                socket.join(roomName);
                console.log(`Joined room ${roomName}`);
            }
            // Send the message to the recipient
            io.to(roomName).emit('receive-message', message, senderId);
        });
        socket.on('disconnect', () => {
            console.log(`Socket disconnected: ${socket.id}`);
        });
    });
};
exports.default = handleConnection;
//# sourceMappingURL=soket.js.map