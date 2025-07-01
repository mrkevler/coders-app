
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createdPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const validatePassword = async (inputPassword, password) => {
  return bcrypt.compare(inputPassword, password);
};

export const createToken = (user) => {
  const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return jwtToken;
};
