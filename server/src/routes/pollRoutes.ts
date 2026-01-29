import { Router } from 'express';
import PollController from '../controllers/PollController';

const router = Router();

router.post('/', PollController.createPoll);
router.get('/active', PollController.getActivePoll);

export default router;
