import { Router } from 'express';
import { handleVnPayIPN } from '../controllers/paymentController';

const router: Router = Router();

router.get('/', handleVnPayIPN);

export default router;
