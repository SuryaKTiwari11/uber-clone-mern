import { validationResult } from "express-validator";
import captainModel from "../models/captain.model.js";
import captainService from "../services/captain.service.js";
import blacklistTokenModel from "../models/blacklistToken.model.js";

const registerCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, vehicle } = req.body;

  try {
    // Check if captain exists
    const isCaptain = await captainModel.findOne({ email });
    if (isCaptain) {
      return res.status(400).json({ message: "Captain already exists" });
    }

    // Hash password
    const hashPassword = await captainModel.hashPassword(password);

    // Create new captain
    const captain = await captainService.createCaptain({
      firstname: fullname.firstName,
      lastname: fullname.lastName,
      email,
      password: hashPassword,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType,
    });

    const token = captain.generateAuthToken();
    res.status(201).json({ token, captain });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(400).json({ message: error.message });
  }
};

const loginCaptain = async (req, res, next) => {
  //validate the request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); //return the errors in json format
  }

  const { email, password } = req.body; // we destructure the request body
  const captain = await captainModel.findOne({ email }).select("+password");

  //we find the captain by email and select the password
  //The +password in the select method is used to explicitly include the password field in the query result.
  //By default, fields that are marked as select:
  //false in the Mongoose schema are excluded from query results.
  //Using +password overrides this default behavior and includes the password field in the result
  //This is necessary for comparing the provided password with the stored hashed password during login.

  if (!captain) {
    return res.status(401).json({ message: "invalid email or password" });
  }
  //simply return a message if the captain does not exist

  //if the captain exist we compare the password
  //we call the comparePassword method on the captain object
  const isMatch = await captain.comparePassword(password);
  if (!isMatch) {
    return res.status(400).json({ message: "invalid email or password" });
  }
  //if the password does not match we return a message

  //if the password match we generate a token for the captain
  const token = captain.generateAuthToken();

  //we set the token in a cookie
  res.cookie("token", token);

  res.status(200).json({ token, captain }); //we return the token and the captain
};
const getCaptainProfile = async (req, res, next) => {
  const captain = await captainModel.findOne({ email: req.captain.email }); //we find the captain by email
  if (!captain) {
    return res.status(404).json({ message: "Captain not found" });
  } //if the captain does not exist we return
  res.status(200).json({ message: "profile fetched successfully", captain }); //if the captain exist we return the captain
};
const logoutCaptain = async (req, res) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  //extract the token from the cookie or the header
  if (!token) {
    return res.status(400).json({ message: "No token provided" });
  } //if the token is not provided we return a message
  await blacklistTokenModel.create({ token });
  //create a blacklist token using the token
  res.clearCookie("token"); //clear the token from the cookie
  res.status(200).json({ message: "Logged out successfully" });
};

export { registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain };

//1:22:36  https://youtu.be/4qyBjxPlEZo?si=Tuix4jBaXmVYhX8E
