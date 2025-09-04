import express from 'express';
const router = express.Router();
import { react,updateReaction,getAllReactions,deleteReaction } from '../controllers/reactionController.js';
import { verify } from '../middleware/middleware.js';

/**
 * @swagger
 * /api/reaction/create:
 *   post:
 *     tags:
 *       - Reactions
 *     summary: React on a blog
 *     description: This API is used to react on a blog.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - post_id
 *               - reaction
 *             properties:
 *               post_id: 
 *                 type: integer
 *               reaction:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Reaction posted successfully.
 *       '401':
 *         description: Invalid credentials.
 *       '500':
 *         description: Server error occurred while processing the request.
 */
router.post('/create',verify,react);

/**
 * @swagger
 * /api/reaction/update:
 *   put:
 *     tags:
 *       - Reactions
 *     summary: Update an exiting reaction
 *     description: This API is used to update an existing reaction.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reaction_id
 *               - reaction
 *             properties:
 *               reaction_id: 
 *                 type: integer
 *               reaction:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Reaction updated successfully.
 *       '401':
 *         description: Invalid credentials.
 *       '500':
 *         description: Server error occurred while processing the request.
 */
router.put('/update',verify,updateReaction);

/**
 * @swagger
 * /api/reaction/get:
 *   get:
 *     tags:
 *       - Reactions
 *     summary: Fetch reactions
 *     description: This API is used fetch reactions on a post.
 *     parameters:
 *       - in: query
 *         name: post_id          
 *         schema:
 *           type: integer
 *         required: true
 *         description: post_id
 *     responses:
 *       '200':
 *         description: Reactions fetched successfully.
 *       '401':
 *         description: Invalid credentials.
 *       '500':
 *         description: Server error occurred while processing the request.
 */
router.get('/get',verify,getAllReactions);

/**
 * @swagger
 * /api/reaction/delete:
 *   delete:
 *     tags:
 *       - Reactions
 *     summary: Delete an existing reaction
 *     description: This API is used to delete an existing reaction.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reaction_id
 *             properties:
 *               reaction_id:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Reaction deleed successfully.
 *       '401':
 *         description: Invalid credentials.
 *       '500':
 *         description: Server error occurred while processing the request.
 */
router.delete('/delete',verify,deleteReaction);
export default router;