import dotenv from "dotenv";
dotenv.config();

import { createServer } from "http";
import app from "./app.js";

const port = process.env.PORT || 4000;
const server = createServer(app);

// By passing the Express application (app) to createServer, you are telling the server to use the Express application to handle incoming requests.

server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

/*
Purpose: This file is responsible for starting the server and listening on a specified port. It imports the Express application from app.js and starts the server.
Content: It contains the logic for starting the server and handling server-level configurations.
*/
