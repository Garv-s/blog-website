import express from 'express';
const router = express.Router();
import { writeComment,updateComment,getAllComments,deleteComment } from '../controllers/commentController.js';
import { verify } from '../middleware/middleware.js';

/**
 * @swagger
 * /api/comment/write:
 *   post:
 *     tags:
 *       - Comments
 *     summary: Comment on a blog
 *     description: This API is used to post a new comment.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - post_id
 *               - comment
 *             properties:
 *               post_id: 
 *                 type: integer
 *               comment:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Comment posted successfully.
 *       '401':
 *         description: Invalid credentials.
 *       '500':
 *         description: Server error occurred while processing the request.
 */
router.post('/write',verify,writeComment);

/**
 * @swagger
 * /api/comment/update:
 *   put:
 *     tags:
 *       - Comments
 *     summary: Update an exiting comment
 *     description: This API is used to update an existing comment.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - comment_id
 *               - comment
 *             properties:
 *               comment_id: 
 *                 type: integer
 *               comment:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Comment updated successfully.
 *       '401':
 *         description: Invalid credentials.
 *       '500':
 *         description: Server error occurred while processing the request.
 */
router.put('/update',verify,updateComment);

/**
 * @swagger
 * /api/comment/get:
 *   get:
 *     tags:
 *       - Comments
 *     summary: Fetch comments
 *     description: This API is used read comments on a post.
 *     parameters:
 *       - in: query
 *         name: post_id          
 *         schema:
 *           type: integer
 *         required: true
 *         description: post_id
 *     responses:
 *       '200':
 *         description: Comments fetched successfully.
 *       '401':
 *         description: Invalid credentials.
 *       '500':
 *         description: Server error occurred while processing the request.
 */
router.get('/get',verify,getAllComments);

/**
 * @swagger
 * /api/comment/delete:
 *   delete:
 *     tags:
 *       - Comments
 *     summary: Delete an existing comment
 *     description: This API is used to delete an existing comment.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - comment_id
 *             properties:
 *               comment_id:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Comment deleed successfully.
 *       '401':
 *         description: Invalid credentials.
 *       '500':
 *         description: Server error occurred while processing the request.
 */
router.delete('/delete',verify,deleteComment);
export default router;