import { Router, Request, Response } from 'express';
import mongoose, { ObjectId } from 'mongoose';
import { AuthenticatedRequest } from '../interfaces/request';
import verifyToken from '../middleware/auth';
import Post, { IPost } from '../models/Post';
import { createResponse } from '../utils/response';
import { deleteImage, uploadImage } from '../utils/handleImage';


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
    const post = await Post.findById({ _id: req.params.id });
    console.log(post);
    
    await Promise.all(post.image.map((file) => deleteImage(file)));
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
  const { description } = req.body;

  const files = Array.isArray(req.files.images)
    ? req.files.images
    : [req.files.images];

  try {
    // const results = await Promise.all(files.map(uploadImage));
    const results = await Promise.all(
      files.map((file) => uploadImage(req.userId, file))
    );
    if (!results) {
      return createResponse(res, 500, false, 'Internal Server Error');
    }
    console.log('log id: ', req.userId);

    const newPost: IPost = new Post({
      description,
      image: results,
      user: req.userId,
    });
    await newPost.save();
    return res.status(200).json({
      success: true,
      message: 'Post created successfully',
      post: newPost,
    });
  } catch (error) {
    console.log(error);
    return createResponse(res, 500, false, 'Internal Server Error');
  }
};


export { createPost, updatePost, deletePost, getPosts };
