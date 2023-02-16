import { Router, Request, Response } from 'express';
import verifyToken from '../middleware/auth';
import Post from '../models/Post';

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
  const { title, description, url, status } = req.body;
  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: 'Title is required' });
  }

  try {
    let updatePost: any = {
      title,
      description: description || '',
      url: (url.startsWith('https://') ? url : `https://${url}`) || '',
      status: status || 'to learn',
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
  const { title, description, url, status } = req.body;

  // validation
  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: 'Title is required' });
  }

  try {
    const newPost = new Post({
      title,
      description,
      url: url.startsWith('https://') ? url : `https://${url}`,
      status: status || 'to learn',
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

export { createPost, updatePost, deletePost, getPosts };
