import express from "express";
import { register, login } from "../controllers/UserController"
import { body } from "express-validator";

const router = express.Router()

router.post("/login", [
    body('email').isEmail().withMessage("Provided email is not valid format"),
    body('password').notEmpty().withMessage("Password is required")
], login)

router.post("/register", [
    body('email').isEmail().withMessage("Provided email is not valid format"),
    body('password').isLength({min: 8}).withMessage("Password must be at least 8 characters"),
    body('bio').optional().isLength({min: 100}).withMessage("Bio should be 100 characters at least")
], register)

export default router
