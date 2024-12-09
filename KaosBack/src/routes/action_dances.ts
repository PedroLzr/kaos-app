import { Router } from 'express';
import { postDance, deleteDance } from '../controllers/action_dances';

const router = Router();

router.post('/', postDance);
router.delete('/', deleteDance);

export default router;