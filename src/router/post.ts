import { Router, Request, Response } from 'express';
import verifyToken from '../middleware/auth';
import Post from '../models/Post';
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/postController';
import { checkImage } from '../middleware/validation';
import { deleteImage } from '../utils/handleImage';
// import { deleteImage } from '../utils/handleImage';

interface AuthenticatedRequest extends Request {
  userId: string;
}
const router: Router = Router();

//@router GET api/posts
//desc get posts
//access private
router.get('/', verifyToken, getPosts);

//@router POST api/posts
//desc Creates a post
//access private
router.post('/', verifyToken, checkImage, createPost);

//@router PUT api/posts
//desc update a post
//access private
router.put('/:id', verifyToken, updatePost);

//@router DELETE api/posts
//desc delete a post
//access private
router.delete('/:id', verifyToken, deletePost);

router.get('/delete',  deleteImage);
// router.get('/dedehehehe', run);


// router.post('/uploads', checkImage, upUps);
// router.post('/uploads', verifyToken, checkImage, createPostTest);

export default router;
