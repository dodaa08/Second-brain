import mongoose from "mongoose";
import { Schema } from "mongoose";

interface Iuser extends Document{
    name : string,
    email : string,
    password : string
}

const User = new Schema<Iuser>({
    name : {},
    email : {},
    password : {} 
})