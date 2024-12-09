import { Router } from 'express';
import { getEvent,
         getEvents,
         getEventsByCity,
         getEventsByLocal,
         postEvent,
         putEvent,
         deleteEvent,
         joinEvent,
         leaveEvent,
         postComment,
         deleteComment } from '../controllers/events';

const router = Router();

router.get('/', getEvents);

router.get('/:id', getEvent);

router.get('/city/:city', getEventsByCity)

router.get('/local/:localId', getEventsByLocal)

router.post('/', postEvent);

router.put('/:id', putEvent);

router.delete('/:id', deleteEvent);

router.put('/event/join', joinEvent);

router.put('/event/leave', leaveEvent);

router.post('/comment', postComment);

router.delete('/comment/:id', deleteComment);

export default router;