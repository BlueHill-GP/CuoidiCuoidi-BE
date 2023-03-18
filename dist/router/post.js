"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const postController_1 = require("../controllers/postController");
const validation_1 = require("../middleware/validation");
const imageUtils_1 = require("../utils/imageUtils");
const router = (0, express_1.Router)();
//@router GET api/posts
//desc get posts
//access private
router.get('/', postController_1.getPosts);
router.get('/:id', postController_1.getAllPostsByUserId);
//@router POST api/posts
//desc Creates a post
//access private
router.post('/', auth_1.verifyToken, auth_1.verifyTypeUser, validation_1.checkImage, postController_1.createPost);
//@router PUT api/posts
//desc update a post
//access private
router.put('/:id', auth_1.verifyToken, postController_1.updatePost);
//@router DELETE api/posts
//desc delete a post
//access private
router.delete('/:id', auth_1.verifyToken, postController_1.deletePost);
;
router.get('/like/:id', auth_1.verifyToken, postController_1.handleLikePost);
router.get('/delete', imageUtils_1.deleteImage);
// router.get('/dedehehehe', run);
// router.post('/uploads', checkImage, upUps);
// router.post('/uploads', verifyToken, checkImage, createPostTest);
exports.default = router;
//# sourceMappingURL=post.js.map