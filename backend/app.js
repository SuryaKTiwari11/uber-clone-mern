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

connectToDb();  
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/users", userRoute);
app.use("/captains", captainRoute);

export default app;
