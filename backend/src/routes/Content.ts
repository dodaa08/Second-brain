import express, {Request, Response} from "express";
import AuthMiddleware from "./middleware";
import { content } from "../db"
import Z from "zod";

const ContentRouter = express.Router();


const Content = Z.object({
    type : Z.string(),
    Link : Z.string()
});

//  add crud operations, vector db, frontend UI, UX good one and done, drag and drop maybe.

// create the thread to be saved..  inputs : type : content, Link : for saving some online post.
const create = async (req: Request, res: Response): Promise<Response> => {
    const content_check  = Content.safeParse(req.body);
    if(!content_check.success){
        return res.status(400).send("Content can't be validated...");
    }
    const {type, Link} = content_check.data;
    try{
        await content.create({
            type : type,
            link : Link
        });
        console.log("Thread Created...");
    }
    catch(Error){
        console.log("Error :", Error);
    }
    res.status(200).send("Thread Created...");
}

const getContent = async(req : Request, res : Response)=>{
    const {content_id} = req.body;

    try{
        const result = await content.findOne({id : content_id});
        if(!result){
            return res.send("Data not found..");
        }
        res.status(200).send(`Content :  ${result}`);
        console.log(`Content :  ${result}`);
    }
    catch(Error){
        console.log(`${Error}`);
    }
} 



const updateContent = async(req : Request, res : Response)=>{
    const {content_id} = req.body;

    try{
        const result = await content.updateOne({id : content_id});
        if(!result){
            return res.status(400).send("Content not found...");
        }

        res.status(200).send(`Content Updated.. : ${result}`);
        console.log("Content Updated...");
    }
    catch(Error){
        console.log(`${Error}`);
    }

}

const _delete = async(req : Request, res : Response)=>{
    const {content_id} = req.body;
    try{
        const result = await content.deleteOne({id : content_id});
        if(!result){
            return res.status(400).send("Content not found...");
        }
        res.status(200).send("Content Deleted..");
        console.log("Content Deleted...");
    }
    catch(Error){
        console.log(`${Error}`);
    }
}


ContentRouter.post("/create", create);
ContentRouter.post("/delete", _delete);
ContentRouter.post("/update", updateContent);
ContentRouter.post("/get", getContent);



export default ContentRouter;