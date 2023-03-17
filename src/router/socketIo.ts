import { Router } from 'express';
import { createPostNotify } from '../controllers/testSocketIo';


const router: Router = Router();


router.post('/', createPostNotify);

export default router;
