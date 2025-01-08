import captainModel from "../models/captain.model.js";
import captainService from "../services/captain.service.js";

const registerCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullname, email, password, vehicle } = req.body;

  const isCaptain = await captainModel.findOne(email);
  if (isCaptain) {
    return res.status(400).json({ message: "Captain already exists" });
  }

  const hashPassword = await captainModel.hashPassword(password);

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
};

const loginCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const captain = await captainModel.findOne(email).select("+password");
  if (!captain) {
    return res.status(400).json({ message: "invaild email or password" });
  }
  const isMatch = await captain.comparePassword(password, captain.password);
  if (!isMatch) {
    return res.status(400).json({ message: "invalid email or password" });
  }
  const token = captain.generateAuthToken();
  res.cookie("token", token);
  res.status(200).json({ token, captain });
};
const getCaptainProfile = async (req, res, next) => {
  const captain = await captainModel.findOne({ email: req.captain.email });
  res.status(200).json(captain);
};
const logoutCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.header.authorization.split(" ")[1];
  await blacklistTokenModel.create({ token });
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};

export { registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain };

//1:22:36  https://youtu.be/4qyBjxPlEZo?si=Tuix4jBaXmVYhX8E
