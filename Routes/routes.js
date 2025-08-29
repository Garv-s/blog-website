import express from "express";
import authRoutes from "./authRoutes.js";
import blogRoutes from "./blogRoutes.js";
import commentRoutes from "./commentRoutes.js"
const router = express.Router();
router.use(express.json());
router.use("/auth",authRoutes);
router.use("/blog",blogRoutes);
router.use("/comment",commentRoutes);
export default router;