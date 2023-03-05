import UserInfoRedis from '../models/UserInfoRedis';
import RedisUtils from '../utils/redisUtils';

const PREFIX_KEY = 'UserInfo:';
const EXPIRE = 1800;

export const set = (user: UserInfoRedis, callBack?: (err, reply) => void) => {
  const key = PREFIX_KEY + user.email;
  const value = JSON.stringify(user);
  return RedisUtils.set(key, value, EXPIRE, callBack);
};

export const get = (email: String, callBack?: (err, reply) => void) => {
  return RedisUtils.get(PREFIX_KEY + email, callBack);
};

export default {
  set,
  get,
};
