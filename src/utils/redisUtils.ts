import client from '../config/redis';

const set = (
  key: string,
  value: string,
  exTime: number,
  callBack?: (err, reply) => void
) => {
  return client.set(key, value, 'EX', exTime, callBack);
};

const get = (key: string, callBack?: (err, reply) => void) => {
  return client.get(key, callBack);
};

export default {
  get,
  set,
};
