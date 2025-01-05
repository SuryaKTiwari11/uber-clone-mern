const mongoose = require("mongoose");
//we access the mongoose module and store it in a variable called mongoose
//Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.
//It provides a way to interact with a MongoDB database using JavaScript objects.
//Mongoose provides a schema-based solution to model your application data.
//It includes built-in type casting, validation, query building, and business logic hooks.
//Mongoose also provides a way to define relationships between data models.
function connectToDb() {
  mongoose
    .connect(process.env.DB_CONNECT, {
    })
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log("Error connecting to DB:", err));
}

module.exports = connectToDb;
