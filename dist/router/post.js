"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../middleware/auth"));
const postController_1 = require("../controllers/postController");
const router = (0, express_1.Router)();
//@router GET api/posts
//desc get posts
//access private
router.get('/', auth_1.default, postController_1.getPosts);
//@router POST api/posts
//desc Creates a post
//access private
router.post('/', auth_1.default, postController_1.createPost);
//@router PUT api/posts
//desc update a post
//access private
router.put('/:id', auth_1.default, postController_1.updatePost);
//@router DELETE api/posts
//desc delete a post
//access private
router.delete('/:id', auth_1.default, postController_1.deletePost);
//@router POST api/posts
//desc Creates a post
//access private
router.post('/uploads', postController_1.upUps);
exports.default = router;
//# sourceMappingURL=post.js.map