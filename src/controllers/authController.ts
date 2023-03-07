import argon2 from 'argon2';
import express, { Request, Response } from 'express';
import Jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import { IResponse } from '../interfaces/types';
import { createResponse as response } from '../utils/responseUtils';
import { generateToken, updateRefreshToken } from '../utils/tokenUtils';
import { generateOTP } from '../utils/OTPUtils';
import UserInfoRedis from '../repositories/UserRedisRepository';
import OtpRedis from '../repositories/OtpRedisRepository';
import { mailRegister } from '../utils/mailUtils';
import UserInfo from '../models/UserInfo';

const register = async (req: Request, res: Response) => {
  // validation
  const { username, password, email, phone, userType } = req.body;

  try {
    // start user save user in redis
    const hashedPassword = await argon2.hash(password);

    const otp = generateOTP();

    const userInfo = {
      username,
      password: hashedPassword,
      email,
      phone,
      userType,
    };
    const dataOtp = {
      otp: otp,
      email: email,
    };
    UserInfoRedis.set(userInfo);
    OtpRedis.set(dataOtp);
    // send OTP in mail
    mailRegister(otp, email);

    response(
      res,
      200,
      true,
      'We was send you an OPT, Please check it in your email.'
    );
  } catch (err) {
    console.log(err);
    return response(res, 500, false, 'Internal server error');
  }
};

const verifyRegister = async (req, res) => {
  const { email } = req.body;
  UserInfoRedis.get(email, (err, reply) => {
    const user = JSON.parse(reply);
    try {
      const newUser = new User(user);
      const newUserInfo = new UserInfo({ userId: newUser._id });
      newUser.save();
      newUserInfo.save();
      response(res, 200, true, 'user successfully registered');
    } catch (error) {
      console.log(error);
      return response(res, 500, false, 'Internal server error');
    }
  });
};

const login = async (req: Request, res: Response<IResponse>) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return response(res, 404, false, 'Incorrect email or password?');
    }

    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch) {
      return response(res, 400, false, 'Incorrect email or password?');
    }
    const token = generateToken(user._id);
    updateRefreshToken(user._id, token.refreshToken);
    response(res, 200, true, 'Login successful', token);
  } catch (err) {
    console.log(err);
    return response(res, 500, false, 'Internal server error');
  }
};

const getRefreshToken = async (req: Request, res: Response<IResponse>) => {
  const { userId, refreshToken } = req.body;
  if (!userId || !refreshToken) {
    return response(res, 400, false, 'Missing userId or refreshToken?');
  }

  try {
    Jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const token = generateToken(userId);
    updateRefreshToken(userId, token.refreshToken);
    response(res, 200, true, 'refreshToken successful', token);
  } catch (error) {
    console.log(error.name);
    if (error.name === 'TokenExpiredError') {
      const token = generateToken(userId);
      updateRefreshToken(userId, token.refreshToken);
      return response(res, 200, true, 'refreshToken successful', token);
    }
    return response(res, 500, false, 'Internal server error');
  }
};
export { register, login, getRefreshToken, verifyRegister };
