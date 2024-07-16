import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import User from "../models/user.js";

const router = express.Router();

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const { profile, preferences } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.profile = profile;
    user.preferences = preferences;

    await user.save();

    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
