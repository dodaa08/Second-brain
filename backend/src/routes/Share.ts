import express from "express";
import { Request, Response } from "express";
import { link, content, user } from "../db";
import AuthMiddleware from "./middleware";
const LinkRouter = express.Router();

const randomHash = (len : number)=>{
    const option = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length = option.length;
    let result = "";

    for(let i = 0;i< len; i++){ // consider len as your dificullty level.
        result += option[Math.floor(Math.random() * length)];
    }

    return result;

}


const Share =async (req : Request, res : Response) => {  // this is the logic to create the link in the DB
    const share = req.body.share;
    if(share){
        await link.create({
            userId : req.userId,
            hash : randomHash(10)
        });
        res.status(201).send({ message: "Share created successfully" });
    } else {
        await link.deleteOne({userId : req.userId});
        res.status(400).send({ message: "Share data is missing" });
    }
}

const ShareLink = async(req : Request, res : Response)=>{  // This is the one which creates a link for you and gives u the info
       const hash = req.body.hash;

       try{
          const check = await link.findOne({hash : hash});

          if(!check){
            return res.send("Hash not found..");
          }
          if(check){
            const brain = await content.findOne({ userId : req.userId});
            const userdeatils = await user.findOne({ _id ; req.userId});
            
            if(!user){
                return res.send("user not found..")
            }
            
            res.json({
                username : userdeatils?.name,
                Content : brain
            });


          }
          
       }
       catch(Error){
        console.log("Error" + Error);
       }

}



LinkRouter.post("/share", AuthMiddleware,  Share);
LinkRouter.get("/:shareLink", AuthMiddleware, ShareLink);


export default LinkRouter;
