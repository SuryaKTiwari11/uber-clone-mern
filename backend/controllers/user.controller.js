import userModel from "../models/user.model.js";
import userService from "../services/user.service.js";
import { validationResult } from "express-validator";
import blacklistTokenModel from "../models/blacklistToken.model.js";

const registerUser = async (req, res, next) => {
  const errors = validationResult(req); //validate the request
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); //return the errors in json format
  }
  const { fullname, email, password } = req.body; //we destructure the request body
  const isUserExisting = await userModel.findOne({ email });
  //we check if the user exist in the Database by email
  if (isUserExisting) {
    return res.status(400).json({ message: "User Already exists" });
  }
  //if the user does not exist we hash the password
  const hashPassword = await userModel.hashPassword(password);

  //we create the user using the userService
  const user = await userService.createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashPassword, //we store the hashed password
  });
  const token = user.generateAuthToken(); //we generate a token for the user
  res.status(201).json({ token, user }); //we return the token and the user
};

const loginUser = async (req, res, next) => {
  const errors = validationResult(req); //validate the request
  if (!errors.isEmpty()) {
    //if there are errors
    return res.status(400).json({ errors: errors.array() }); //return the errors in json format
  }
  const { email, password } = req.body; // we destructure the request body

  const user = await userModel.findOne({ email }).select("+password");

  //we find the user by email and select the password
  //The +password in the select method is used to explicitly include the password field in the query result.
  //By default, fields that are marked as select:
  //false in the Mongoose schema are excluded from query results.
  //Using +password overrides this default behavior and includes the password field in the result
  //This is necessary for comparing the provided password with the stored hashed password during login.

  if (!user) {
    return res.status(401).json({ message: "invalid email or password" });
  } //if the user does not exist we return a message "invalid email or password"

  const isMatch = await user.comparePassword(password);
  //compare the hash-passwords
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  } //return a message if the password is incorrect
  const token = user.generateAuthToken(); //generate a token for the user
  res.cookie("token", token); //set the token in a cookie
  res.status(200).json({ token, user }); //return the token and the user
};

const getUserProfile = async (req, res, next) => {
  //get the user profile
  const user = await userModel.findOne({ email: req.user.email }); //find the user by email
  if (!user) return res.status(404).json({ message: "User not found" });
  //return a message if the user does not exist
  res.status(200).json({ message: "profile fetched successfully", user });
  //return the user if the user exist
};
const logoutUser = async (req, res) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  //extract the token from the cookie or the header
  if (!token) {
    return res.status(400).json({ message: "No token provided" });
  } //return a message if the token is not provided
  await blacklistTokenModel.create({ token }); //create a blacklist token using the token
  res.clearCookie("token"); //clear the token from the cookie
  res.status(200).json({ message: "Logged out successfully" });
};

export { registerUser, loginUser, getUserProfile, logoutUser };
