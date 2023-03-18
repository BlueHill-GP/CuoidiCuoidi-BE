import { NextFunction, Response, Request } from 'express';
import { createResponse as response } from '../utils/responseUtils';
import { ObjectId } from 'mongodb';
import UserRedis from '../repositories/UserSocketRepository';

interface SocketRequest extends Request {
  userId: string;
  partnerId: string;
  socketId?: string;
}
export const getSocketPartnerId = async (
  req: SocketRequest,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body);
  const { userId, partnerId, socketId } = req.body
  console.log(userId, partnerId, socketId);
  

  try {
    let socketPartner;
    socketPartner = await new Promise((resolve, reject) => {
      UserRedis.get(partnerId, (error, reply) => {
        if (error) {
          reject(error);
          console.log('qweqwe12123', error);

        } else {
          console.log("qweqwe12123",reply);
          
          resolve(reply);
        }
      });
    });
    console.log('socketPartner:', socketPartner);

    req.socketId = socketPartner;

    next();
  } catch (error) {
    console.log(error);
    return response(res, 500, false, 'Internal Server Error');
  }
};
