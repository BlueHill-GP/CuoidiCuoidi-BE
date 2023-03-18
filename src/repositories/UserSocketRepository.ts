import { IUserSocket } from '../models/UserSocketIo';
import redisUtils from '../utils/redisUtils';

const PREFIX_KEY = 'SOCKET:';
const EXPIRE = 100000;

export const set = (payload: IUserSocket, callBack?: (err, reply) => void) => {
  const key = PREFIX_KEY + payload.userId;
  const value = payload.userSocketId;
  return redisUtils.set(key, value, EXPIRE, callBack);
};

export const get = (userId: String, callBack?: (err, reply) => void) => {
  return redisUtils.get(PREFIX_KEY + userId, callBack);
};

export default {
  set,
  get,
};
