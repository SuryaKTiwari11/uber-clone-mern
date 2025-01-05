const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
    },
    SocketId: {
        type: String,
    },
});
