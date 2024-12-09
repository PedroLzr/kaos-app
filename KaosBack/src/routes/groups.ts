import { Router } from 'express';
import { getGroups,
         getGroup,
         getMyGroups,
         postGroup,
         putGroup,
         deleteGroup,
         joinGroup,
         leaveGroup,
         sendGroupInvitation,
         postComment,
         deleteComment } from '../controllers/groups';

const router = Router();

router.get('/', getGroups);

router.get('/:id', getGroup);

router.get('/groups/mygroups', getMyGroups);

router.post('/', postGroup);

router.put('/:id', putGroup);

router.delete('/:id', deleteGroup);

router.put('/group/join', joinGroup);

router.put('/group/leave', leaveGroup);

router.post('/group/sendInvitation', sendGroupInvitation);

router.post('/comment', postComment);

router.delete('/comment/:id', deleteComment);

export default router;