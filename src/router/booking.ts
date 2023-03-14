import { Router } from 'express';
import {
  createABooking,
  getAllBookingByUser,
  updateBooking,
  updateBookingStatus,
} from '../controllers/bookingController';
import { verifyToken } from '../middleware/auth';
import { verifyPackageService } from '../middleware/servicePackage';

const router: Router = Router();

//@router GET api/posts
//desc get posts
//access private
// router.get('/', verifyToken, getPosts);

//@router POST api/posts
//desc Creates a post
//access private
router.post('/', verifyPackageService, createABooking);

router.get('/user/', verifyToken, getAllBookingByUser);
;

//@router PUT api/posts
//desc update a post
//access private
// router.put('/:id', updateBooking);
router.put('/:id', verifyToken, updateBookingStatus);

//@router DELETE api/posts
//desc delete a post
//access private
// router.delete('/:id', verifyToken, deletePost);

export default router;
