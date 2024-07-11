// models/user.js

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  profile: {
    name: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      default: null,
    },
    avatarUrl: {
      type: String,
      default: null,
    },
  },
  preferences: {
    programmingLanguage: {
      type: String,
      default: "C++",
    },
    theme: {
      type: String,
      enum: ["light", "dark"],
      default: "dark",
    },
  },
  activity: {
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    loginAttempts: {
      type: Number,
      default: 0,
    },
  },
});

const User = mongoose.model("User", userSchema);

export default User;
