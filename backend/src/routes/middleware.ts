import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"; 
import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET as string;

if (!SECRET_KEY) {
    throw new Error("JWT_SECRET is missing in environment variables");
}

interface AuthRequest extends Request {
    userId?: string;
}

const AuthMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const header = req.headers.authorization?.split(" ")[1]; 

    if (!header) {
        return res.status(401).json({ error: "Unauthorized. No token provided." });
    }   
    const token = header.trim();

    try {
        const decoded = jwt.verify(token, SECRET_KEY) as { userId: string };
        console.log("Decoded Token:", decoded);

        if (!decoded.userId) {
            return res.status(401).json({ error: "Unauthorized. Token is invalid or missing userId." });
        }

        // **Fix: Attach userId to request**
        req.userId = decoded.userId;  
        next();
    } catch (error) {
        return res.status(401).json({ error: "Unauthorized. Invalid token." });
    }
};



export default AuthMiddleware;

