
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const auth = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      throw new Error("Invalid authorisation");
    }
    if (!authorization.startsWith("Bearer ")) {
      throw new Error("Invalid authorisation");
    }
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.uderID = decoded.id;
    next();
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
};

export default auth;
