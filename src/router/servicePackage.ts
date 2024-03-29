import { Router } from 'express';
import {
  createServicePackage,
  deleteServicePackage,
  getAllServicePackagesById,
  getAllServicePackagesByUserId,
  getRandomServicePackage,
  getServicePackagesByFilter,
  searchServicePackages,
  updateServicePackage,
} from '../controllers/servicePackageController';
import { verifyToken, verifyTypeUser } from '../middleware/auth';
import { checkImage } from '../middleware/validation';

const router: Router = Router();

//@router GET api/posts
//desc get posts
//access private
router.get('/user/:id',verifyToken,  getAllServicePackagesByUserId);

router.get('/id/:id', getAllServicePackagesById);

router.get('/random', getRandomServicePackage);

router.post('/filter', getServicePackagesByFilter);
router.post('/search', searchServicePackages);

//@router POST api/posts
//desc Creates a post
//access private
router.post('/', verifyToken,verifyTypeUser, checkImage, createServicePackage);

//@router PUT api/posts
//desc update a post
//access private
router.put('/:id', verifyToken, updateServicePackage);

//@router DELETE api/posts
//desc delete a post
//access private
router.delete('/:id', verifyToken, deleteServicePackage);

export default router;
