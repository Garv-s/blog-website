import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

export const verify = async (req, res,next) => {
    const header = req.headers['authorization'];
    const token = header && header.split(" ")[1];
    //console.log(token);
    
    if(!token) return res.status(401).json({ message: 'No token provided' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        //console.log(decoded);
        req.user = decoded;
        next();
    } catch (error) {
        //console.log(error);
        return res.status(403).json({ message: 'Invalid or expired token' });

    }


}