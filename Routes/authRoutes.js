import {login, registerUser} from "./controllers/authentication.js"
import  {verify}  from "./middleware.js";
import express from 'express';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', login);

// router.get('/protected', verify, (req, res) => {
//   res.json({ message: 'Protected route accessed', user: req.user });
// });

export default router;
