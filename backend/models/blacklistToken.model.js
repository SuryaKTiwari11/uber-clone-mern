import mongoose from "mongoose";

//create schema for blacklistToken jwt tokens and have ttl of 24 hours
const blacklistTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400,
  },
});

const blacklistTokenModel = mongoose.model(
  "blacklistToken",
  blacklistTokenSchema
);
export default blacklistTokenModel;
