import { Router } from 'express';
import { getLocals,
         getLocalsByCity,
         getLocal,
         postLocal,
         putLocal,
         deleteLocal,
         postComment,
         deleteComment } from '../controllers/locals';

const router = Router();

router.get('/', getLocals);

router.get('/:id', getLocal);

router.get('/city/:city', getLocalsByCity);

router.post('/', postLocal);

router.put('/:id', putLocal);

router.delete('/:id', deleteLocal);

router.post('/comment', postComment);

router.delete('/comment/:id', deleteComment);

export default router;