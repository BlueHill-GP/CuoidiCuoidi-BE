import { Router } from 'express';
import { createPostNotify } from '../controllers/testSocketIo';
import { getSocketPartnerId } from '../middleware/getUserSocketIo';


const router: Router = Router();


router.post('/', createPostNotify);


export default router;
