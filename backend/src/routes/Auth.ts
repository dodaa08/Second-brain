import express from "express";
import { user } from "../db";
import Z from "zod";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const Secret = process.env.Secret;
if (!Secret) {
    throw new Error("Secret key is missing in environment variables");
}

const User = Z.object({
    name: Z.string(),
    password: Z.string(),
});

const AuthRouter = express.Router();

// SignUp
const SignUp = async (req: any, res: any) => {
    const result = User.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({ message: result.error.errors });
    }

    const { name, password } = result.data;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashed_password = await bcrypt.hash(password, salt);

        const newUser = await user.create({ name, password: hashed_password });
        console.log("User created");

        // ✅ Include userId in token
        const token = JWT.sign({ userId: newUser._id, name }, Secret, { expiresIn: "1h" });

        return res.status(201).json({ message: "User created successfully", token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// SignIn
const SignIn = async (req: any, res: any) => {
    const result = User.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({ message: result.error.errors });
    }

    const { name, password } = result.data;

    try {
        const response = await user.findOne({ name });
        if (!response) {
            return res.status(400).json({ message: "Couldn't find your data. Try Signing Up." });
        }

        const find = await bcrypt.compare(password, response.password.toString());
        if (!find) {
            return res.status(400).json({ message: "Invalid Credentials." });
        }

        // ✅ Include userId in token
        // const token = JWT.sign({ userId: response._id, name }, Secret, { expiresIn: "1h" });
        const token = JWT.sign({ userId: response._id, name }, Secret);
        console.log("Signed In..", token);
        return res.status(200).json({ message: "User Signed In.", token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error", error });
    }
};

AuthRouter.post("/signup", SignUp);
AuthRouter.post("/signin", SignIn);

export default AuthRouter;
