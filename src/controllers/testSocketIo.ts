import { createResponse as response } from '../utils/responseUtils';
import { getUserSocketId } from '../utils/socketIo';
export const createPostNotify = async (req, res) => {
  const { userId, partnerId } = req.body;

  try {
    // const roomId = `room_${userId}-${partnerId}`;
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

export const BookingNotification = async (
  userId: string,
  partnerId: string
) => {
  //  const roomId = `room_${userId}-${partnerId}`;
  //  const partnerSocketId = await getUserSocketId(partnerId);
  // const socket2 = global._io.sockets.sockets.get(partnerSocketId || partnerId);
  // console.log(roomId);
  // console.log(socket2.id);

  //  global._io.to(socket2.id).emit('message', { data: 'love' });

  const partnerSocketId = await getUserSocketId(partnerId);
  const socket2 = global._io.sockets.sockets.get(partnerSocketId || partnerId);

  // if (!global._io.sockets.adapter.rooms.get(roomId)) {
  //   socket2.join(roomId);
  // }

  global._io.to(socket2.id).emit('message', { data: 'love' });
};

export const notification = async (receiver: string, message: string) => {
  const partnerSocketId = await getUserSocketId(receiver);
 
    const socket2 = global._io.sockets.sockets.get(partnerSocketId || receiver);
    console.log(message);
    
    if (socket2) {
    console.log(message, socket2.id);

      global._io.to(socket2.id).emit('message', { data: message });
    }

};

export const sendDataAndNotification = async (sender: string,receiver: string, message: string,data:any) => {
  try {
    const senderSocketId = await getUserSocketId(sender);
    const receiverSocketId = await getUserSocketId(receiver);
    const socket1 = global._io.sockets.sockets.get(senderSocketId || sender);
    const socket2 = global._io.sockets.sockets.get(receiverSocketId || receiver);
    
     global._io.to(socket1.id).emit('update-booking', { data: data });
     global._io.to(socket2.id).emit('update-booking', { data: data });
     global._io.to(socket2.id).emit('message', { data: message });
  } catch (error) {
    console.log(error);
    
  }

}

export const sendDataBooking = async (
  receiver: string,
  data: any
) => {
  try {
    const receiverSocketId = await getUserSocketId(receiver);
    const socket2 = global._io.sockets.sockets.get(
      receiverSocketId || receiver
    );
    console.log('uar', data);

    global._io.to(socket2.id).emit('new-booking', { data: data });
  } catch (error) {
    console.log(error);
  }
};