import { createResponse as response } from '../utils/responseUtils';
import { getUserSocketId } from '../utils/socketIo';
export const createPostNotify = async (req, res) => {
  const { userId, partnerId } = req.body;

  try {
    const roomId = `room_${userId}-${partnerId}`;
    const partnerSocketId = await getUserSocketId(partnerId);
    const socket2 = global._io.sockets.sockets.get(
      partnerSocketId || partnerId
    );

    // if (!global._io.sockets.adapter.rooms.get(roomId)) {
    //   socket2.join(roomId);
    // }

    global._io.to(socket2.id).emit('message', { data: 'love' });

    response(res, 200, false, 'good');
  } catch (error) {
    console.log(error);
    return response(res, 500, false, 'Internal Server Error');
  }
};


export const BookingNotification = async (userId: string, partnerId: string) => {
   const roomId = `room_${userId}-${partnerId}`;
   const partnerSocketId = await getUserSocketId(partnerId);
  const socket2 = global._io.sockets.sockets.get(partnerSocketId || partnerId); 
  console.log('it is heare', socket2.id, partnerSocketId, partnerId);
  
  

   // if (!global._io.sockets.adapter.rooms.get(roomId)) {
   //   socket2.join(roomId);
   // }

   global._io.to(socket2.id).emit('message', { data: 'love' });
 }