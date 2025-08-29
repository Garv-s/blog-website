import express from 'express';
const router = express.Router();
import { writeComment,updateComment,getAllComments,deleteComment } from '../controllers/commentController.js';
import { verify } from '../middleware/middleware.js';

router.post('/write',verify,writeComment);
router.put('/update',verify,updateComment);
router.get('/get',verify,getAllComments);
router.delete('/delete',verify,deleteComment);
export default router;