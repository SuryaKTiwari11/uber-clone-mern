import { Router } from "express";
const router = Router();
//we access the express module and store it in a variable called express
//we call the Router method on our express object and store the result in a variable called router
//what is the router method?
//The Router method is a function that returns a new router object.
//The router object is used to define routes for our application.
//We can define multiple routes on the router object and then attach the router object to our app object.
//This allows us to group related routes together and keep our code organized.

import { registerUser } from "../controllers/user.controller.js";

import { body } from "express-validator";
//we access the body method from the express-validator module and store it in a variable called body
//what is the body method?
//The body method is a function that returns a middleware function.
//This middleware function is used to validate the request body.
//It checks if the request body contains the specified fields and if they meet the specified criteria.
//If the request body is valid, the next middleware function is called.
//If the request body is invalid, an error response is sent back to the client.

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("invalid Email"),
    body("fullName")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("password must be aleast 6 character long"),
  ],
  registerUser
);
//we call the post method on our router object and pass it three arguments: a string '/register', an array of middleware functions, and a callback function.
//The string '/register' is the route we want to match.
//The array of middleware functions contains two functions: body('email').isEmail() and body('password').isLength({min:6}).
//These middleware functions validate the email and password fields in the request body.
//The callback function is the function that will be called when a POST request is made to that route.
//It takes two arguments: req (the request object) and res (the response object).

router.post('/register', (req, res) => {
  // ...controller logic...
  res.send('User registered');
  
});

export default router;
