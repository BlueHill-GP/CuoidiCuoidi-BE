import { Router, Request, Response } from 'express';
import mongoose, { ObjectId } from 'mongoose';
import verifyToken from '../middleware/auth';
import Post, { IPost } from '../models/Post';
import {  uploadImage } from '../utils/uploadImage';

interface AuthenticatedRequest extends Request {
  userId: string;
}
const router: Router = Router();

const getPosts = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const posts = await Post.find({ user: req.userId }).populate('user', [
      'username',
    ]);
    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

const deletePost = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const postUpdateCondition = { _id: req.params.id, user: req.userId };
    const deletedPost = await Post.findOneAndDelete(postUpdateCondition);

    if (!deletedPost) {
      return res.status(401).json({
        success: false,
        message: 'User is not authorized or post is not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Post successfully deleted',
      post: deletedPost,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

const updatePost = async (req: AuthenticatedRequest, res: Response) => {
  const { description, image }: IPost = req.body;
  if (!description || !image) {
    return res
      .status(400)
      .json({ success: false, message: 'description is required' });
  }

  try {
    let updatePost: any = {
      description: description,
      image: image,
    };

    const postUpdateCondition = { _id: req.params.id, user: req.userId };
    updatePost = await Post.findOneAndUpdate(postUpdateCondition, updatePost, {
      new: true,
    });

    if (!updatePost) {
      return res.status(401).json({
        success: false,
        message: 'User is not authorized or post is not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Post successfully updated',
      post: updatePost,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

const createPost = async (req: AuthenticatedRequest, res: Response) => {
  const { description, image } = req.body;

  // validation
  if (!description || !image) {
    return res
      .status(400)
      .json({ success: false, message: 'Title is required' });
  }

  try {
    const newPost: IPost = new Post({
      description,
      image: [image],
      user: req.userId,
    });

    await newPost.save();
    res.status(200).json({
      success: true,
      message: 'Post created successfully',
      post: newPost,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

const upUp = async (req: Request, res: Response) => {
  const files = Array.isArray(req.files.image)
    ? req.files.image
    : [req.files.image];
  const results = await Promise.all(files.map(uploadImage));
  const allUploaded = results.every((result) => result);
  if (allUploaded) {
    res.status(200).json({
      message: 'File(s) uploaded successfully',
      data: files.map((file) => ({
        url: `https://s3.amazonaws.com/cuoidicuoidi-store/${file.name}`,
      })),
    });
  } else {
    res.status(500).json({ message: 'File upload failed' });
  }
};

const upUps = async (req: Request, res: Response) => {
  const files = Array.isArray(req.files.images)
    ? req.files.images
    : [req.files.images];
  
  console.log(files);
  
  const results = await Promise.all(files.map(uploadImage));
  const allUploaded = results.every((result) => result);
  if (allUploaded) {
    res.status(200).json({
      message: 'File(s) uploaded successfully',
      data: files.map((file) => ({
        url: `https://s3.amazonaws.com/cuoidicuoidi-store/${file.name}`,
      })),
    });
  } else {
    res.status(500).json({ message: 'File upload failed' });
  }
};


export { createPost, updatePost, deletePost, getPosts, upUp, upUps };
