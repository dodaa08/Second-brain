import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"; 

const SECRET_KEY = process.env.JWT_SECRET || "your_default_secret"; // Use a default for development

interface AuthRequest extends Request {
    userId?: string;
}

const AuthMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers["authorization"];
        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

        const decoded = jwt.verify(token, SECRET_KEY) as { id: string };

        if (!decoded || !decoded.id) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }

        req.userId = decoded.id; // Attach `userId` to request object
        next(); // Proceed to next middleware
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }
};

export default AuthMiddleware;
