import { config } from "dotenv";
config();

import express from "express";
import cors from "cors";

import cookieParser from "cookie-parser";

//database
import { connectToDb } from "./db/db.js";

//routes
import userRoute from "./routes/user.routes.js";
import captainRoute from "./routes/captain.routes.js";

const app = express();

try {
  connectToDb();
} catch (error) {
  console.error("Error connecting to database:", error);
  process.exit(1);
}

app.use(cors());
app.use(express.json()); //parse json data
app.use(express.urlencoded({ extended: true })); //parse urlencoded data
app.use(cookieParser()); //parse cookies

app.use("/users", userRoute);
app.use("/captains", captainRoute);

export default app;