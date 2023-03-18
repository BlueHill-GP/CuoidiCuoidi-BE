import { Router } from 'express';
import { verifyToken, verifyTypeUser } from '../middleware/auth';
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  getAllPostsByUserId,
  handleLikePost,
} from '../controllers/postController';
import { checkImage } from '../middleware/validation';
import { deleteImage } from '../utils/imageUtils';

const router: Router = Router();

//@router GET api/posts
//desc get posts
//access private
router.get('/', getPosts);


router.get('/:id', getAllPostsByUserId);

//@router POST api/posts
//desc Creates a post
//access private
router.post('/', verifyToken, verifyTypeUser, checkImage, createPost);

//@router PUT api/posts
//desc update a post
//access private
router.put('/:id', verifyToken, updatePost);

//@router DELETE api/posts
//desc delete a post
//access private
router.delete('/:id', verifyToken, deletePost);


;
router.get('/like/:id', verifyToken, handleLikePost);

router.get('/delete', deleteImage);
// router.get('/dedehehehe', run);

// router.post('/uploads', checkImage, upUps);
// router.post('/uploads', verifyToken, checkImage, createPostTest);

export default router;
