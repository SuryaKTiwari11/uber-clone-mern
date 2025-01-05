import captainModel from "../models/captain.model.js";
import captainService from "../services/captain.service.js";

const registerCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullname, email, password, vehicle } = req.body;
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

export { registerCaptain };

//1:22:36  https://youtu.be/4qyBjxPlEZo?si=Tuix4jBaXmVYhX8E