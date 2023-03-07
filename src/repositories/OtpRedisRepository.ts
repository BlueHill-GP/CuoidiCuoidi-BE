import OtpInfoRedis from '../models/OtpRedis';
import redisUtils from '../utils/redisUtils';

const PREFIX_KEY = 'OTP:';
const EXPIRE = 100;

export const set = (payload: OtpInfoRedis, callBack?: (err, reply) => void) => {
  const key = PREFIX_KEY + payload.email;
  const value = payload.otp;
  return redisUtils.set(key, value, EXPIRE, callBack);
};

export const get = (email: String, callBack?: (err, reply) => void) => {
  return redisUtils.get(PREFIX_KEY + email, callBack);
};

export default {
  set,
  get,
};
