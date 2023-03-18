"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPostsByUserId = exports.getPosts = exports.deletePost = exports.updatePost = exports.createPost = void 0;
const Post_1 = __importDefault(require("../models/Post"));
const responseUtils_1 = require("../utils/responseUtils");
const imageUtils_1 = require("../utils/imageUtils");
const User_1 = __importDefault(require("../models/User"));
// const router: Router = Router();
const getPosts = async (req, res) => {
    try {
        const page = req.query.page || 1; // Default to page 1 if no page parameter is provided
        const pageSize = 10; // Number of posts per page
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const posts = await Post_1.default.find()
            .populate('user', ['username'])
            .skip(startIndex)
            .limit(pageSize);
        res.status(200).json({
            success: true,
            posts,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
exports.getPosts = getPosts;
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
const getAllPostsByUserId = async (req, res) => {
    try {
        const userId = req.params.id;
        const page = req.query.page || 1; // Default to page 1 if no page parameter is provided
        const pageSize = 10; // Number of posts per page
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const posts = await Post_1.default.find({ user: userId })
            .populate('user', ['username'])
            .skip(startIndex)
            .limit(pageSize);
        (0, responseUtils_1.createResponse)(res, 200, true, 'get posts successfully', posts);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
exports.getAllPostsByUserId = getAllPostsByUserId;
const deletePost = async (req, res) => {
    try {
        const postUpdateCondition = { _id: req.params.id, user: req.userId };
        const post = await Post_1.default.findById({ _id: req.params.id });
        console.log(post);
        await Promise.all(post.image.map((file) => (0, imageUtils_1.deleteImage)(file)));
        const deletedPost = await Post_1.default.findOneAndDelete(postUpdateCondition);
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
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
exports.deletePost = deletePost;
const updatePost = async (req, res) => {
    const { description, image } = req.body;
    if (!description || !image) {
        return res
            .status(400)
            .json({ success: false, message: 'description is required' });
    }
    try {
        let updatePost = {
            description: description,
            image: image,
        };
        const postUpdateCondition = { _id: req.params.id, user: req.userId };
        updatePost = await Post_1.default.findOneAndUpdate(postUpdateCondition, updatePost, {
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
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
exports.updatePost = updatePost;
const createPost = async (req, res) => {
    const { description } = req.body;
    const files = Array.isArray(req.files.images)
        ? req.files.images
        : [req.files.images];
    try {
        // const results = await Promise.all(files.map(uploadImage));
        const results = await Promise.all(files.map((file) => (0, imageUtils_1.uploadImage)(req.userId, file)));
        if (!results) {
            return (0, responseUtils_1.createResponse)(res, 500, false, 'Internal Server Error');
        }
        console.log('log id: ', req.userId);
        const newPost = new Post_1.default({
            description,
            image: results,
            user: req.userId,
        });
        const user = await User_1.default.findById(req.userId);
        await newPost.save();
        newPost.userName = user.username;
        global._io.emit('new-post', newPost);
        return res.status(200).json({
            success: true,
            message: 'Post created successfully',
            post: newPost,
        });
    }
    catch (error) {
        console.log(error);
        return (0, responseUtils_1.createResponse)(res, 500, false, 'Internal Server Error');
    }
};
exports.createPost = createPost;
//# sourceMappingURL=postController.js.map