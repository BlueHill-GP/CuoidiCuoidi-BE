import { IBooking } from '../interfaces/module';
import UserInfoRedis from '../models/UserInfoRedis';
import RedisUtils from '../utils/redisUtils';

const PREFIX_KEY = 'Booking:';
const EXPIRE = 300;

export const set = (booking: IBooking, callBack?: (err, reply) => void) => {
  const key = PREFIX_KEY + booking._id;
  const value = JSON.stringify(booking);
  return RedisUtils.set(key, value, EXPIRE, callBack);
};

export const get = (_id: String, callBack?: (err, reply) => void) => {
  return RedisUtils.get(PREFIX_KEY + _id, callBack);
};

export default {
  set,
  get,
};
