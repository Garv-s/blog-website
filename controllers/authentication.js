import dotenv from "dotenv";
dotenv.config();
import db from "../DB/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateLoginToken = (user) => {
  const JWT_KEY = process.env.JWT_KEY;
  const JWT_EXPIRY = process.env.JWT_EXPIRY;
  /*console.log(jwt.sign(
    {
      user_id: user.user_id,
    },
    JWT_KEY,
    {
      expiresIn: JWT_EXPIRY,
    }
  ));*/
  return jwt.sign(
    {
      user_id: user.user_id,
    },
    JWT_KEY,
    {
      expiresIn: JWT_EXPIRY,
    }
  );
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json("Email is required");
    }
    const user = await db("users").where({ email }).first();
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = generateLoginToken(user);
    //console.log(token);
    let exist = await db("users")
      .select("name", "email")
      .where({ email })
      .first();
    const result = {
      token,
    };
    return res.json({ exist, result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await db("users").where({ email }).first();
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const [user] = await db("users")
      .insert({ name, email, password: hashedPassword })
      .returning(["user_id", "email"]);
    const token = generateLoginToken(user);
    const result = {
      user,
      token,
    };
    res.status(201).json({ user, token: token });
  } catch (error) {
    console.error("Error in user registeration:", error);
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
