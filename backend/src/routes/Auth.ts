import express from "express";
import {user} from "../db"
import Z from "zod";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
const Secret : any = process.env.Secret;

const salt = 10;


const User = Z.object({
    name : Z.string().email(),
    password : Z.string().length(6)
});

const AuthRouter = express.Router();


const SignUp = async (req : any, res : any)=>{
    const result = User.safeParse(req.body);
    
    if(!result.success){
        return res.status(400).json({message : result.error.errors});
    }
    const {name, password} = result.data;


      const hashed_password = bcrypt.hash(password, salt);
      try{
        await user.create({name : name, password : hashed_password});
        console.log("User created");
      }
      catch(error){
        console.log(error);
      }
}

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

        const token = JWT.sign({ name }, Secret, { expiresIn: "1h" });
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