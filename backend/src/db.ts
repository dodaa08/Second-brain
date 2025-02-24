import mongoose, { Schema, model } from "mongoose";

// Strict Types.

interface IUser extends Document{
    name : String,
    password : String
}

interface IContent extends Document{
    type : String,
    link : String,
    tags : mongoose.Types.ObjectId[],
    userId : mongoose.Types.ObjectId
}

interface ILink extends Document{
    type : String,

}


// Schema definition.

const User = new Schema<IUser>({
    name : {type : String, unique : true , required : true},
    password : {type : String, required : true}
})

const Content = new Schema<IContent>({
    type : {type : String},
    link : String,
    tags : [{type : Schema.Types.ObjectId, ref : "Tag"}],
    userId : {type : Schema.Types.ObjectId, ref : "User", required : true}
});


const Link = new Schema<ILink>({

})


const user = model<IUser>("User", User);
const content = model<IContent>("Content", Content);
const link = model<ILink>("Link", Link);

export {user, content, Link}
