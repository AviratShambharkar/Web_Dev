import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import UserCode from "../models/userCode.js";

const router = express.Router();

router.get("/submissions/:problemId", authMiddleware, async (req, res) => {
  try {
    const submissions = await UserCode.find({
      problemId: req.params.problemId,
    }).populate("userId", "userName");
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
