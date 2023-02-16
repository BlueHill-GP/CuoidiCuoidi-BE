import argon2 from 'argon2';
import express, { Request, Response } from 'express';
import Jwt from 'jsonwebtoken';
import User from '../models/User';
import { IResponse } from '../types';
import { createResponse as response } from '../utils/response';
import { generateToken, updateRefreshToken } from '../utils/token';

const register = async (req: Request, res: Response) => {
  // validation
  const { username, password } = req.body;
  console.log(username, password);
  if (!username && !password) {
    return response(res, 400, false, 'Missing username or password?');
  }

  try {
    //check if user already exists
    const user = await User.findOne({ username });
    if (user) {
      return response(res, 400, false, 'User already exists');
    }
    // start user registration
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    response(res, 200, true, 'User registered successfully');
  } catch (err) {
    console.log(err);
    return response(res, 500, false, 'Internal server error');
  }
};

const login = async (req: Request, res: Response<IResponse>) => {
  const { username, password } = req.body;
  console.log(username, password);

  if (!username || !password) {
    return response(res, 400, false, 'Missing username or password?');
  }
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return response(res, 404, false, 'Incorrect username or password?');
    }

    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch) {
      return response(res, 400, false, 'Incorrect username or password?');
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
export { register, login, getRefreshToken };
