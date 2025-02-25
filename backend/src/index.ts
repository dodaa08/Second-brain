import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import AuthRouter from "./routes/Auth";
import ContentRouter from "./routes/Content";
import LinkRouter from "./routes/Share";
dotenv.config();


const app = express();
const PORT = process.env.PORT;
const mongo = process.env.Mongo_DB;
console.log("Mongo DB instance " + mongo);
console.log("PORT" + PORT);
app.use(express.json());

app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/content", ContentRouter);
app.use("/api/v1/share", LinkRouter);


app.get("/",()=>{
    console.log("Application working fine...");
});


app.listen(PORT, ()=>{
    console.log(`App running on : ${PORT}`);
});


const connect = async()=>{
    try{
        console.log("Connecting to mongo DB...");
        await mongoose.connect(`${mongo}`);
        console.log("Connected to the DB...");
    }
    catch(error){
        console.log(error);
    }
}
connect();


