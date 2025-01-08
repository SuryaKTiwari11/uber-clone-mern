import userModel from "../models/user.model.js";
import captainModel from "../models/captain.model.js";
import pkg from "bcryptjs";
const { compare, hash } = pkg;
import another_pkg from "jsonwebtoken";
const { verify } = another_pkg;
import blacklistTokenModel from "../models/blacklistToken.model.js";

const authUser = async (req, res, next) => {
  const token = req.cookies.token || req.header.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied, No token provided" });
  }
  const isBlacklisted = await blacklistTokenModel.findOne({ token: token });
  if (isBlacklisted)
    return res
      .status(401)
      .json({ message: "Access denied, Token blacklisted" });
  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decoded._id);
    return next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Access denied, No token provided" });
  }
};

const authCaptain = async (req, res, next) => {
  const token = res.cookies.token || req.header.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied, No token provided" });
  }
  const isBlacklisted = await blacklistTokenModel.findOne({ token: token });
  if (isBlacklisted)
    return res
      .status(401)
      .json({ message: "Access denied, Token blacklisted" });
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
