import User from "../models/user.model.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, email, image, password } = req.body;
  const newUser = User({ name, email, image, password });
  newUser
    .save()
    .then(() => {
      res.status(201).json({ message: "User registered succesfully" });
    })
    .catch((error) => {
      console.log("Error creating user", error);
      res.status(500).json({ message: "Error registering the user", error });
    });
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }
    if (user.password !== password) {
      return res.status(402).json({ message: "Invalid password" });
    }
    const secretKey = crypto.randomBytes(32).toString("hex");

    const token = jwt.sign({ userId: user._id }, secretKey);
    res.status(200).json({ token });
  } catch (error) {
    console.log("error loggin in", error);
    res.status(500).json({ message: "Server error", error });
  }
};
