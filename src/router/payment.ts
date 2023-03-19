import { Router } from 'express';
import { getQrCode } from '../controllers/momoControler';
import { handleVnPayIPN } from '../controllers/paymentController';

const router: Router = Router();

router.get('/', handleVnPayIPN);

router.post('/momo', getQrCode);



export default router;
