import express from "express";
import User from "../models/User.js";
import {
  createdPassword,
  createToken,
  validatePassword,
} from "../utils/utils.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Error("User already exists");
    }

    const hashedPassword = await createdPassword(password);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isValid = await validatePassword(password, user.password);

    if (!isValid) {
      throw new Error("Invalid credentials");
    }

    const token = createToken(user);

    res.status(200).json({
      token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
});

export default router;
