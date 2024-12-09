import { Router } from 'express';
import { postHeart, deleteHeart } from '../controllers/action_hearts';

const router = Router();

router.post('/', postHeart);
router.delete('/', deleteHeart);

export default router;