import express, { Request, Response } from "express";
import { content, user } from "../db";
import Z from "zod";
import AuthMiddleware from "./middleware";
import { isValidObjectId } from "mongoose"; // Validate MongoDB IDs

const ContentRouter = express.Router();


interface AuthRequest extends Request {
    userId?: string;
}

// Define Content Schema
const ContentSchema = Z.object({
    type_link: Z.string(),
    link: Z.string(),
    heading: Z.string(),
    tags: Z.array(Z.string()),
});

// Update Schema (Optional Fields)
const UpdateSchema = Z.object({
    type_link: Z.string().optional(),
    link: Z.string().optional(),
    heading: Z.string().optional(),
    tags: Z.array(Z.string()).optional(),
    userId : Z.string()
});

// Create Content
const create = async (req: AuthRequest, res: Response) => {
    const userId = req.userId;  // **Fix: Get userId from AuthMiddleware**
    
    if (!userId) {
        return res.status(401).json({ error: "Unauthorized: User ID missing." });
    }

    const contentCheck = ContentSchema.safeParse({ ...req.body, userId });

    if (!contentCheck.success) {
        return res.status(400).json({ error: "Invalid content data." });
    }

    const { type_link, link, heading, tags } = contentCheck.data;

    try {
        await content.create({ type_link, link, heading, tags, userId });
        console.log("Thread Created...");
        res.status(201).json({ message: "Thread Created." });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



// Get Content
const getContent = async (req: Request, res: Response) => {
    const { content_id } = req.params;

    if (!content_id || !isValidObjectId(content_id)) {
        return res.status(400).json({ error: "Invalid or missing content_id." });
    }

    try {
        const result = await content.findOne({ _id: content_id });
        if (!result) {
            return res.status(404).json({ error: "Data not found." });
        }
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


const getAllposts = async (req : Request, res : Response)=>{
    try{
        const posts = await content.find();
        res.status(200).send(posts);

    }
    catch(error : any){
        console.log("Error :", error);
        res.send(`Error :  ${error}`);
    }

}




// Update Content
const updateContent = async (req: Request, res: Response) => {
    const { content_id, ...updateData } = req.body;

    if (!content_id || !isValidObjectId(content_id)) {
        return res.status(400).json({ error: "Invalid or missing content_id." });
    }

    const updateCheck = UpdateSchema.safeParse(updateData);
    if (!updateCheck.success) {
        return res.status(400).json({ error: "Invalid update data." });
    }

    try {
        const result = await content.updateOne({ _id: content_id }, { $set: updateCheck.data });
        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: "Content not found or not modified." });
        }
        res.status(200).json({ message: "Content Updated." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Delete Content
const deleteContent = async (req: Request, res: Response) => {
    const { content_id } = req.params;

    if (!content_id || !isValidObjectId(content_id)) {
        return res.status(400).json({ error: "Invalid or missing content_id." });
    }

    try {
        const result = await content.deleteOne({ _id: content_id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Content not found." });
        }
        res.status(200).json({ message: "Content Deleted." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



// Define Routes
ContentRouter.post("/create", AuthMiddleware, create);
ContentRouter.delete("/delete/:content_id", AuthMiddleware, deleteContent);
ContentRouter.put("/update/:content_id", AuthMiddleware, updateContent);
ContentRouter.get("/get/:content_id", AuthMiddleware, getContent);
ContentRouter.get("/getAll", AuthMiddleware, getAllposts);

export default ContentRouter;
