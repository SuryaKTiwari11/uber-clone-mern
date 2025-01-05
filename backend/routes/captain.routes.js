import { Router } from "express";
const router = Router();
import { body } from "express-validator";
import { registerCaptain } from "../controllers/captain.controller.js";
 
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstName")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("fullname.lastName")
      .optional()
      .isLength({ min: 3 })
      .withMessage("Last name must be at least 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("vehicle.color").isString().withMessage("Color must be a string"),
    body("vehicle.capacity")
      .isNumeric()
      .withMessage("Capacity must be a number"),
    body("vehicle.plate").isString().withMessage("Plate must be a string"),
    body("vehicle.vehicleType")
      .isIn(["car", "bike", "truck", "van", "bus"])
      .withMessage("Vehicle type must be one of [car, bike, truck, van, bus]"),
  ],
  registerCaptain
);

export default router;
