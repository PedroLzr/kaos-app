import { Router } from 'express';
import { getBase64ImageEvent,
         postBase64ImageEvent,
         putBase64ImageEvent,
         deleteBase64ImageEvent } from '../controllers/base64_image_event';

const router = Router();

router.get('/:id', getBase64ImageEvent);
router.post('/:id', postBase64ImageEvent);
router.put('/:id', putBase64ImageEvent);
router.delete('/:id', deleteBase64ImageEvent);

export default router;