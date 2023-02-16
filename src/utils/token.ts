import Jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import RefreshToken from '../models/RefreshToken';
dotenv.config();

const generateToken = (payload: string) => {
  const accessToken = Jwt.sign({ payload }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '12m',
  });
  const refreshToken = Jwt.sign({ payload }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '2h',
  });
  return { accessToken, refreshToken };
};

const updateRefreshToken = async (userId: string, refreshToken: string) => {
  try {
    const user = await RefreshToken.findOne({ userId: userId });
    if (user) {
      await RefreshToken.findByIdAndUpdate(user._id, {
        refreshToken: refreshToken,
      });
    } else {
      await RefreshToken.create({
        userId: userId,
        refreshToken: refreshToken,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export { generateToken, updateRefreshToken };
