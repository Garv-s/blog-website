import {login, registerUser} from "../controllers/authentication.js"
import  {verify}  from "../middleware/middleware.js";
import express from 'express';
const router = express.Router();
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Authorization
 *     summary: Register a user
 *     description: This API is used to register a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name: 
 *                 type: string
 *                 example: john smith
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       '200':
 *         description: User logged in successfully.
 *       '401':
 *         description: Invalid credentials.
 *       '500':
 *         description: Server error occurred while processing the request.
 */
router.post('/register', registerUser);
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Authorization
 *     summary: Log in a user
 *     description: This API is used to log in an existing user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       '200':
 *         description: User logged in successfully.
 *       '401':
 *         description: Invalid credentials.
 *       '500':
 *         description: Server error occurred while processing the request.
 */
router.post('/login', login);

// router.get('/protected', verify, (req, res) => {
//   res.json({ message: 'Protected route accessed', user: req.user });
// });

export default router;
