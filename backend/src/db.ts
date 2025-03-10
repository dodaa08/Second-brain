import mongoose, { Schema, model } from "mongoose";

// Strict Types.

interface IUser extends Document{
    name : String,
    password : String,
    userId : String
}

interface IContent extends Document{
    type_link : String,
    link : String,
    heading : String,
    tags : [{type : String}]
    userId : mongoose.Types.ObjectId
}

interface ILink extends Document{
    hash : String,
    userId : mongoose.Types.ObjectId
}


// Schema definition.

const User = new Schema<IUser>({
    name : {type : String , required : true},
    password : {type : String, required : true}
})

const Content = new Schema<IContent>({
    type_link : {type : String},
    link : {type : String},
    heading : {type : String},
    tags : [{type : String, ref : "Tag"}],
    // userId : {type : Schema.Types.ObjectId,  required : true}
});


const Link = new Schema<ILink>({
    hash : String,
    // userId : {type : Schema.Types.ObjectId, ref : "User", required : true}
})


const user = model<IUser>("User", User);
const content = model<IContent>("Content", Content);
const link = model<ILink>("Link", Link);

export {user, content, link}
