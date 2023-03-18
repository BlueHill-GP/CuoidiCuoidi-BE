import UserSocketRepository from '../repositories/UserSocketRepository';

export const getUserSocketId = async (userId: string): Promise<string> => {
  let socketPartner;
  socketPartner = await new Promise((resolve, reject) => {
    UserSocketRepository.get(userId, (error, reply) => {
      if (error) {
        reject(error);
        console.log('user in not defined', error);
      } else {
        resolve(reply);
      }
    });
  });
  return socketPartner;
};
