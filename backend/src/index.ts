import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import AuthRouter from "./routes/Auth";
import ContentRouter from "./routes/Content";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const mongo = process.env.Mongo_DB;

if (!mongo) {
    console.error("Mongo_DB connection string is missing in .env!");
    process.exit(1);
}

console.log("Mongo DB instance:", mongo);
console.log("PORT:", PORT);

app.use(express.json());


const corsOption = {
    origin: ['https://secondb.vercel.app', 'http://localhost:3001'],  // ✅ Remove trailing slash
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsOption));

app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/content", ContentRouter);

app.get("/", (req, res) => {
    console.log("Application working fine...");
    res.send("Server is running!");
});

app.listen(PORT, () => {
    console.log(`App running on: ${PORT}`);
});

const connect = async () => {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(mongo);
        console.log("Connected to the DB...");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
        process.exit(1);
    }
};
connect();
