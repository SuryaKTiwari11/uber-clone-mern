const dotenv = require("dotenv");
//we access the dotenv module and store it in a variable called dotenv
dotenv.config();
//we call the config method on our dotenv object.
//This will read the .env file and parse the contents.
//The key/value pairs are then stored in the process.env object.
const express = require("express");
//we access the express module and store it in a variable called express
const cors = require("cors");
//we access the cors module and store it in a variable called cors
const app = express();
//we call the express function and store the result in a variable called app

const connectToDb = require("./db/db.js");

app.use(cors());
//we call the use method on our app object and pass it the cors() function.
//This will enable CORS for our server.
//CORS stands for Cross-Origin Resource Sharing.
// It is a security feature implemented by browsers to prevent a webpage from making requests to a different domain than the one that served the webpage.
//By default, browsers will block such requests.
//CORS allows the server to specify which domains can make requests to it.
//In this case, we are allowing all domains to make requests to our server.

app.get("/", (req, res) => {
  res.send("Hello World");
});
//we call the get method on our app object and pass it two arguments: a string '/' and a callback function.
//The string '/' is the route we want to match.
//The callback function is the function that will be called when a request is made to that route.
module.exports = app;
//we export the app object so that it can be used in other files.
