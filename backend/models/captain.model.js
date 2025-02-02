import { Schema, model } from "mongoose";
import pkg from "bcryptjs";
const { compare, hash } = pkg;
import another_pkg from "jsonwebtoken";
const { sign } = another_pkg;

const captainSchema = new Schema({
  fullname: {
    firstName: {
      type: String,
      required: true,
      minlength: [3, "First name must be at least 3 characters long"],
      max: 255,
    },
    lastName: {
      type: String,
      required: false,
      minlength: [3, "Last name must be at least 3 characters long"],
      max: 255,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    max: 255,
    minlength: [6, "Email must be at least 6 characters long"],
    match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  SocketId: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  vehicle: {
    color: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, "Capacity must be at least 1"],
    },
    plate: {
      type: String,
      required: true,
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ["car", "bike", "truck", "van", "bus", "motorcycle" , "other"],
    },
  },
  location: {
    lat: { type: Number },
    lng: { type: Number },
  },
});

captainSchema.methods.generateAuthToken = function () {
  const token = sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

captainSchema.methods.comparePassword = async function (password) {
  return await compare(password, this.password);
};

captainSchema.statics.hashPassword = async function (password) {
  return await hash(password, 10);
};

const captainModel = model("captain", captainSchema);
export default captainModel;
