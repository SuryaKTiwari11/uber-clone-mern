import userModel from "../models/user.model.js";
import userService from "../services/user.service.js";
import { validationResult } from "express-validator";
import blacklistTokenModel from "../models/blacklistToken.model.js";

const registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullname, email, password } = req.body;
  const isUserExisting = await userModel.findOne({ email });
  if (!isUserExisting) {
    return res.status(400).json({ message: "User Already exists" });
  }
  const hashPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({
    firstname: fullname.firstName,
    lastname: fullname.lastName,
    email,
    password: hashPassword,
  });
  const token = user.generateAuthToken();
  res.status(201).json({ token, user });
};

const loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  const user = await userService.findUser({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "invalid email or password" });
  }

  const isMatch = await userModel.comparePassword(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  } 
  const token = user.generateAuthToken();
  res.cookie("token", token);
  res.status(200).json({ token, user });
};

const getUserProfile = async (req, res, next) => {
  const user = await userService.findUser({ email: req.user.email });
  res.status(200).json(user);
};
const logoutUser = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.header.authorization.split(" ")[1];
  await blacklistTokenModel.create({ token });
  res.status(200).json({ message: "Logged out successfully" });
};

export { registerUser, loginUser, getUserProfile, logoutUser };
