import { Router } from 'express';
import { getLocalTypes,
         getLocalType,
         postLocalType,
         putLocalType,
         deleteLocalType } from '../controllers/localtypes';

const router = Router();

router.get('/', getLocalTypes);

router.get('/:id', getLocalType);

router.post('/', postLocalType);

router.put('/:id', putLocalType);

router.delete('/:id', deleteLocalType);

export default router;