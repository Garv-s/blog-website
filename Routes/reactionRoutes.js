import express from 'express';
const router = express.Router();
import { react,updateReaction,getAllReactions,deleteReaction } from '../controllers/reactionController.js';
import { verify } from '../middleware/middleware.js';

router.post('/create',verify,react);
router.put('/update',verify,updateReaction);
router.get('/get',verify,getAllReactions);
router.delete('/delete',verify,deleteReaction);
export default router;