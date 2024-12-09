import { Router } from 'express';
import { getBase64ImageLocal,
         postBase64ImageLocal,
         putBase64ImageLocal,
         deleteBase64ImageLocal } from '../controllers/base64_image_local';

const router = Router();

router.get('/:id', getBase64ImageLocal);
router.post('/:id', postBase64ImageLocal);
router.put('/:id', putBase64ImageLocal);
router.delete('/:id', deleteBase64ImageLocal);

export default router;