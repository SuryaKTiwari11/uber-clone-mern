import { Schema, model } from "mongoose";
import { compare, hash } from "bcryptjs";
//bcrypt is a password hashing function based on the Blowfish cipher and presented at USENIX in 1999.
import { sign } from "jsonwebtoken";
//jsonwebtoken is a library that allows you to generate and verify JSON Web Tokens (JWTs).

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
    //The select option allows you to specify if a field should be returned by default when querying the database.
    //If you set select to false, the field will not be returned by default.
    //This is useful for sensitive fields like passwords.
  },
  SocketId: {
    type: String,
  },
});
//what is a mongoose schema?
//A Mongoose schema defines the structure of the document, default values, validators, etc.,
// whereas a Mongoose model provides an interface to the database for creating, querying, updating, deleting records, etc.

userSchema.methods.generateAuthToken = function () {
  const token = sign({ _id: this._id }, process.env.JWT_SECRET);
  //The jwt.sign method takes two arguments:
  //The first argument is an object that will be stored in the token.
  //In this case, we are storing the user's _id.
  //The second argument is a secret key that is used to sign the token.
  //This secret key should be kept secret and should not be shared.
  //It is used to verify the authenticity of the token.
  return token;
};

userSchema.methods.comparePassword = async function (password) {
  return await compare(password, this.password);
};
//what is a method in mongoose?
//In Mongoose, a method is a function that is defined on the document instance.
//It is called on an instance of the model and operates on that specific instance.
//Methods are useful for defining behavior that is specific to a single document instance.
userSchema.statics.hashPassword = async function (password) {
  return await hash(password, 10);
};
//what is a static method in mongoose?
//In Mongoose, a static method is a method that is defined on the model itself.
//It is not called on an instance of the model, but on the model class itself.
//Static methods are useful for defining utility functions that can be used across multiple instances of the model.

const userModel = model("user", userSchema);
export default userModel;
