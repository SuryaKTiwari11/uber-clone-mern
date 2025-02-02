import captainModel from "../models/captain.model.js";

const createCaptain = async ({
  firstname,
  lastname,
  email,
  password,
  color,
  plate,
  capacity,
  vehicleType,
}) => {
  if (
    !firstname ||
    !email ||
    !password ||
    !color ||
    !plate ||
    !capacity ||
    !vehicleType
  ) {
    throw new Error("All required fields must be provided");
  }

  const captain = await captainModel.create({
    fullname: {
      firstName: firstname,
      lastName: lastname || "",
    },
    email,
    password,
    vehicle: {
      color: color,
      plate: plate,
      capacity: capacity,
      vehicleType: vehicleType,
    },
  });

  return captain;
};

export default { createCaptain };
