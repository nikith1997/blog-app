import { Request, Response } from "express";
import {validationResult} from "express-validator"
import jwt from "jsonwebtoken"
import User from "../models/User";
import bcrypt from "bcrypt"

export const register = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    try {
       const userExist = await User.exists({email: req.body.email})
        if (userExist) {
            return res.status(400).json({
                message: "User with the email already exists"
            })
        }
        const hash = await bcrypt.hash(req.body.password, 10)
        req.body.password = hash
        const newUser = new User(req.body)
        await newUser.save()
        res.status(201).json({
            message: "User created successfully"
        })
    }
    catch (error) {
        res.status(500).json({
            message: "User creation failed"
        })
    }
}

export const login = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    try {
        const user = await User.findOne({email: req.body.email}).exec()
        if (!user) {
            return res.status(400).json({
                "message": "User with email does not exist"
            })
        }
        const verify_password = await bcrypt.compare(req.body.password, user.password)
        if (verify_password) {
            const payload = {
                userId: user._id.toString()
            }
            const options = {expiresIn: "7d"}
            const token = jwt.sign(payload, process.env.JWT_SECRET, options)
            return res.status(200).json({
                "message": "Successful login",
                "token": token
            })
        }
        else {
            return res.status(401).json({
                "message": "Incorrect password"
            })
        }
    }
    catch (error) {
        res.status(500).json({
            "message": "An unknown error has occurred"
        })
    }

}
