import { Router } from 'express';
import { getBase64ImageUserProfile,
         postBase64ImageUserProfile,
         putBase64ImageUserProfile,
         deleteBase64ImageUserProfile } from '../controllers/base64_image_user_profile';

const router = Router();

router.get('/:id', getBase64ImageUserProfile);
router.post('/:id', postBase64ImageUserProfile);
router.put('/:id', putBase64ImageUserProfile);
router.delete('/:id', deleteBase64ImageUserProfile);

export default router;