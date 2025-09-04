
import {writeBlog,readBlog,updateBlog,deleteBlog} from "../controllers/blogController.js"
import  {verify}  from "../middleware/middleware.js";
import express from 'express';
const router = express.Router();

/**
 * @swagger
 * /api/blog/write:
 *   post:
 *     tags:
 *       - Blogs
 *     summary: Write a new blog
 *     description: This API is used to post a new blog.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - content
 *             properties:
 *               title: 
 *                 type: string
 *               description:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Blog posted successfully.
 *       '401':
 *         description: Invalid credentials.
 *       '500':
 *         description: Server error occurred while processing the request.
 */
router.post('/write',verify,writeBlog);
/**
 * @swagger
 * /api/blog/read:
 *   get:
 *     tags:
 *       - Blogs
 *     summary: Read a blog
 *     description: This API is used read blog.
 *     parameters:
 *       - in: query
 *         name: id          
 *         schema:
 *           type: integer
 *         required: true
 *         description: Blog_id
 *     responses:
 *       '200':
 *         description: Blog fetched successfully.
 *       '401':
 *         description: Invalid credentials.
 *       '500':
 *         description: Server error occurred while processing the request.
 */
router.get('/read',readBlog);
/**
 * @swagger
 * /api/blog/update:
 *   put:
 *     tags:
 *       - Blogs
 *     summary: Update an existing blog
 *     description: This API is used to update an existing blog.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - title
 *               - description
 *               - content
 *             properties:
 *               id:
 *                 type: integer
 *               title: 
 *                 type: string
 *               description:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Blog updated successfully.
 *       '401':
 *         description: Invalid credentials.
 *       '500':
 *         description: Server error occurred while processing the request.
 */
router.put('/update',verify,updateBlog);
/**
 * @swagger
 * /api/blog/delete:
 *   delete:
 *     tags:
 *       - Blogs
 *     summary: Update an existing blog
 *     description: This API is used to delete an existing blog.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Blog deleed successfully.
 *       '401':
 *         description: Invalid credentials.
 *       '500':
 *         description: Server error occurred while processing the request.
 */
router.delete('/delete',verify,deleteBlog);

export default router;