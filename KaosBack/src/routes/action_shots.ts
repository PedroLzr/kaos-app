import { Router } from 'express';
import { postShot, deleteShot } from '../controllers/action_shots';

const router = Router();

router.post('/', postShot);
router.delete('/', deleteShot);

export default router;