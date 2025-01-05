import userModel from "../models/user.model.js";

export default {
  createUser: async ({ firstname, lastname, email, password }) => {
    if (!firstname || !email || !password) {
      throw new Error("All fields are required");
    }
    const user = new userModel({
      fullname: {
        firstName: firstname,
        lastName: lastname,
      },
      email,
      password,
    });
    return await user.save();
  },
};
