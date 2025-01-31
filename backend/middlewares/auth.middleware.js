import userModel from "../models/user.model.js";
import captainModel from "../models/captain.model.js";
import pkg from "jsonwebtoken";
const { verify } = pkg;
import blacklistTokenModel from "../models/blacklistToken.model.js";

const authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  //extract the token from the cookie or the header
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied, No token provided" });
  } //if the token is not provided we return a message
  const isBlacklisted = await blacklistTokenModel.findOne({ token: token });
  //check if the token is blacklisted
  if (isBlacklisted) {
    return res
      .status(401)
      .json({ message: "Access denied, Token blacklisted" });
  } //if the token is blacklisted we return a message
  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    //we verify the token
    req.user = await userModel.findById(decoded._id);
    //we find the user by id and store it in the request object
    return next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Access denied, No token provided" });
  }
};

const authCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  //extract the token from the cookie or the header
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied, No token provided" });
  } //if the token is not provided we return a message
  const isBlacklisted = await blacklistTokenModel.findOne({ token: token });
  if (isBlacklisted) {
    return res
      .status(401)
      .json({ message: "Access denied, Token blacklisted" });
      //if the token is blacklisted we return a message
  }
  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    req.captain = await captainModel.findById(decoded._id);
    return next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Access denied, No token provided" });
  }
};

export { authUser, authCaptain };
