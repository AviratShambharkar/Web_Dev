import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

import dbConnect from "./database/db.js";
import User from "./models/user.js";

dbConnect();

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/signUp", async (req, res) => {
  try {
    // Get all the data from the request body
    const {
      userName,
      email,
      password,
      name,
      bio,
      avatarUrl,
      programmingLanguage,
      theme,
      role,
    } = req.body;

    // Check that all the required data exists
    if (!userName || !email || !password) {
      return res.status(400).send("Please enter all the required fields");
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    // Encrypt the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Save user to the database
    const user = await User.create({
      userName,
      email,
      password: hashPassword,
      role: role || "user",
      profile: {
        name,
        bio,
        avatarUrl,
      },
      preferences: {
        programmingLanguage: programmingLanguage || "Python",
        theme: theme || "light",
      },
    });

    // Generate a token for the user and send it
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );
    user.token = token;
    user.password = undefined;

    res
      .status(200)
      .json({ message: "You have successfully registered!", user });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

app.post("/login", async (req, res) => {
  try {
    // Get all the data from the request body
    const { email, password } = req.body;

    // Check that all the data exists
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all the required data" });
    }

    // Find the user in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Create tokens
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    // Store cookies
    const options = {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      httpOnly: true, // Only manipulate by server, not by client/user
      secure: true, // Ensure the cookie is sent over HTTPS
      sameSite: "Strict", // Prevent CSRF attacks
    };

    // Send the response
    res
      .status(200)
      .cookie("token", token, options)
      .json({
        message: "You have successfully logged in!",
        success: true,
        token,
        user: {
          id: user._id,
          userName: user.userName,
          email: user.email,
          role: user.role,
          profile: user.profile,
          preferences: user.preferences,
        },
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/logout", (req, res) => {
  try {
    // Clear the token cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    res.status(200).json({ message: "You have successfully logged out!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
