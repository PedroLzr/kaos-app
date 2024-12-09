import { Router } from 'express';
import { getUsers,
         getUser,
         getUserByToken,
         postUser,
         putUser,
         deleteUser,
         blockUser,
         unblockUser } from '../controllers/users';

const router = Router();

router.get('/', getUsers);

router.get('/:id', getUser);

router.post('/userByToken', getUserByToken);

router.post('/', 
// [
    // check('userName', 'Nombre de usuario necesario').not().isEmpty(),
    // check('phone', 'Teléfono necesario').isMobilePhone('es-ES'),
    // // check('rol').custom(checkExistRole),
    // validateFields
// ],
    postUser);

router.put('/:id', putUser);

router.delete('/:id', deleteUser);

router.post('/block/:id', blockUser);

router.put('/unblock/:id', unblockUser);

export default router;