"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPosts = exports.deletePost = exports.updatePost = exports.createPost = void 0;
const Post_1 = __importDefault(require("../models/Post"));
const response_1 = require("../utils/response");
const handleImage_1 = require("../utils/handleImage");
// const router: Router = Router();
const getPostsByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = req.query.page || 1; // Default to page 1 if no page parameter is provided
        const pageSize = 1; // Number of posts per page
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const posts = yield Post_1.default.find({ user: req.userId })
            .populate('user', ['username'])
            .skip(startIndex)
            .limit(pageSize);
        ;
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
});
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = req.query.page || 1; // Default to page 1 if no page parameter is provided
        const pageSize = 10; // Number of posts per page
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const posts = yield Post_1.default.find()
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
});
exports.getPosts = getPosts;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postUpdateCondition = { _id: req.params.id, user: req.userId };
        const post = yield Post_1.default.findById({ _id: req.params.id });
        console.log(post);
        yield Promise.all(post.image.map((file) => (0, handleImage_1.deleteImage)(file)));
        const deletedPost = yield Post_1.default.findOneAndDelete(postUpdateCondition);
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
});
exports.deletePost = deletePost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        updatePost = yield Post_1.default.findOneAndUpdate(postUpdateCondition, updatePost, {
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
});
exports.updatePost = updatePost;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { description } = req.body;
    const files = Array.isArray(req.files.images)
        ? req.files.images
        : [req.files.images];
    try {
        // const results = await Promise.all(files.map(uploadImage));
        const results = yield Promise.all(files.map((file) => (0, handleImage_1.uploadImage)(req.userId, file)));
        if (!results) {
            return (0, response_1.createResponse)(res, 500, false, 'Internal Server Error');
        }
        console.log('log id: ', req.userId);
        const newPost = new Post_1.default({
            description,
            image: results,
            user: req.userId,
        });
        yield newPost.save();
        return res.status(200).json({
            success: true,
            message: 'Post created successfully',
            post: newPost,
        });
    }
    catch (error) {
        console.log(error);
        return (0, response_1.createResponse)(res, 500, false, 'Internal Server Error');
    }
});
exports.createPost = createPost;
//# sourceMappingURL=postController.js.map