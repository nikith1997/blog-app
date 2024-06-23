import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

interface JwtPayload  {
    userId: string
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
        return res.status(401).json({
            "message": "Unauthorized"
        })
    }
    try {
       const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload
       req.userId = decoded.userId
       next()
    } catch (error) {
        return res.status(401).json({
            "message": "Unauthorized"
        })
    }
}

export default verifyToken
