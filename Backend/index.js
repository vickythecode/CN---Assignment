import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use("/api", taskRoutes);

connectDB()
// mongoose.connect("mongodb+srv://<db_username>:CN123@cluster0.t2awwen.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})
