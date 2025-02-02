import { Router } from "express";
import { body, check } from "express-validator";
import {
  registerCaptain,
  loginCaptain,
  getCaptainProfile,
  logoutCaptain,
} from "../controllers/captain.controller.js";
import { authCaptain } from "../middlewares/auth.middleware.js";
const router = Router();

router.post(
  "/register",
  [
    check("fullname.firstName")
      .notEmpty()
      .withMessage("First name is required")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    check("fullname.lastName")
      .optional()
      .isLength({ min: 3 })
      .withMessage("Last name must be at least 3 characters long"),
    check("email").isEmail().withMessage("Valid email is required"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    check("vehicle.color").notEmpty().withMessage("Vehicle color is required"),
    check("vehicle.plate").notEmpty().withMessage("Vehicle plate is required"),
    check("vehicle.capacity")
      .isNumeric()
      .withMessage("Vehicle capacity must be a number"),
    check("vehicle.vehicleType")
      .notEmpty()
      .withMessage("Vehicle type is required"),
  ],
  registerCaptain
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  loginCaptain
);
router.get("/profile", authCaptain, getCaptainProfile);
router.post("/logout", authCaptain, logoutCaptain);

export default router;
