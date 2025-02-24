import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import AuthRouter from "./routes/Auth";
dotenv.config();

const app = express();
const PORT = process.env.PORT;
const mongo = process.env.Mongo_DB;

app.use(express.json());

app.use("api/v1/auth", AuthRouter);



app.get("/",()=>{
    console.log("Application working fine...");
});


app.listen(PORT, ()=>{
    console.log(`App running on : ${PORT}`);
});


const connect = async()=>{
    try{

        await mongoose.connect(`${mongo}`);
        console.log("Connecting to the DB...");
    }
    catch(error){
        console.log(error);
    }
}
connect();


