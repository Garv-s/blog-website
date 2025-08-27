
import {writeBlog,readBlog,updateBlog,deleteBlog} from "../controllers/blogController.js"
import  {verify}  from "../middleware/middleware.js";
import express from 'express';
const router = express.Router();

router.post('/write',verify,writeBlog);
router.get('/read',readBlog);
router.put('/update',verify,updateBlog);
router.delete('/delete',verify,deleteBlog);

export default router;