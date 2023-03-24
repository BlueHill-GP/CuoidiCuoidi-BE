import { Router, Request, Response } from 'express';
import { AuthenticatedRequest } from '../interfaces/request';
import Post, { IPost, LikeData } from '../models/Post';
import { createResponse as response } from '../utils/responseUtils';
import { deleteImage, uploadImage } from '../utils/imageUtils';
import User from '../models/User';

// const router: Router = Router();

interface PostSocket extends IPost {
  username?: string;
}
const getPosts = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const page: any = req.query.page || 1; // Default to page 1 if no page parameter is provided
    const pageSize = 10; // Number of posts per page
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const posts = await Post.find()
      .populate('user', ['username', 'avatar'])
      .skip(startIndex)
      .limit(pageSize);
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
// const getPostsByUser = async (req: AuthenticatedRequest, res: Response) => {
//   try {
//     const page: any = req.query.page || 1; // Default to page 1 if no page parameter is provided
//     const pageSize = 1; // Number of posts per page
//     const startIndex = (page - 1) * pageSize;
//     const endIndex = startIndex + pageSize;
//     const posts = await Post.find({ user: req.userId })
//       .populate('user', ['username'])
//       .skip(startIndex)
//       .limit(pageSize);
//     res.status(200).json({
//       success: true,
//       posts,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: 'Internal server error',
//     });
//   }
// };

const getAllPostsByUserId = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const page: any = req.query.page || 1; // Default to page 1 if no page parameter is provided
    const pageSize = 40; // Number of posts per page
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const posts = await Post.find({ user: userId }).populate('user', [
      'username', 'avatar', 
    ])
    .skip(startIndex)
    .limit(pageSize);

    response(res, 200, true, 'get posts successfully', posts);
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
      return response(res, 500, false, 'Internal Server Error');
    }
    console.log('log id: ', req.userId);

    const newPost: IPost = new Post({
      description: req.body.description,
      image: results,
      user: req.userId,
    });
    await newPost.save();
    const { _id, description, image, like, user: userId, createAt } = newPost;
    const userData = await User.findById(req.userId);
    const { username, userType, email, avatar } = userData;

    const postData = {
      _id,
      username,
      userType,
      email,
      avatar,
      description,
      image,
      like,
      user: userId,
      createAt,
    };

    // .populate('user', ['username']);
    global._io.emit('new-post', postData);

    return res.status(200).json({
      success: true,
      message: 'Post created successfully',
      post: postData,
    });
  } catch (error) {
    console.log(error);
    return response(res, 500, false, 'Internal Server Error');
  }
};

const handleLikePost = async (req: AuthenticatedRequest, res: Response) => {

  try {
      const postId = req.params.id;
      console.log(postId);

      const userId = req.userId;
      const post = await Post.findById(postId);

      console.log('post: ', post);
      console.log('post: ', post.like);

      // const newLike: LikeData = post.like;

      // if (!newLike[userId]) {
      //   newLike[userId] = true;
      // } else {
        
      // }
    const newLike = toggleLike(post.like, userId);
    
    
      const newPost = await Post.findByIdAndUpdate(
        postId,
        { like: newLike },
        { new: true }
      );

      response(res, 200, true, 'like', newPost);
  } catch (error) {
    console.log(error);
    return response(res, 500, false,'internal server error');
    
  }
  
};

const  toggleLike = (likeObj: LikeData, user: string) => {
  if (user in likeObj) {
    likeObj[user] = !likeObj[user];
  } else {
    likeObj[user] = true;
  }
  return likeObj;
}

export {
  createPost,
  updatePost,
  deletePost,
  getPosts,
  getAllPostsByUserId,
  handleLikePost,
};
