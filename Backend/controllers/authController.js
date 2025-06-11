import User from "../Models/User_Model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  if (!name || !password || !email) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  try {
    const exist = await User.findOne({ email });
    if (exist) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const isAdmin = email === process.env.ADMIN_EMAIL;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: name,
      email,
      password: hashedPassword,
      isAdmin,
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: "User registered successfully", users: newUser });
  } catch (error) {
    console.log(`Error in RegisteringUser :`, error);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ message: "Logged in successfully", token });
  } catch (error) {
    console.log(`Error in Loggingin:`, error);
    res.status(500).json({ message: "Server error" });
  }
};

export const logoutUser = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged Out successful" });
};
