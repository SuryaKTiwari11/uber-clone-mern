import { Schema, model } from "mongoose";
import pkg from "bcryptjs";
const { compare, hash } = pkg;
import another_pkg from "jsonwebtoken";
const { sign } = another_pkg;

const userSchema = new Schema({
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
    max: 255,
    minlength: [6, "Email must be at least 6 characters long"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  SocketId: {
    type: String,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

userSchema.methods.comparePassword = async function (password) {
  return await compare(password, this.password);
};

userSchema.statics.hashPassword = async function (password) {
  return await hash(password, 10);
};

const userModel = model("user", userSchema);
export default userModel;
