import jwt from "jsonwebtoken";
// import dotenv from "dotenv";

// dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = async (id) => {
  console.log("generate Token")
  return await jwt.sign({ id: id }, JWT_SECRET, { expireIn: "3h" });
};

export const verifyToken = async (token) => {
  console.log("verify Token")
  try {
    return await jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.log(error);
    return null;
  }
};