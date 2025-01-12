import dotenv from 'dotenv';
dotenv.config(); // Loads environment variables from the .env file

import express, { Express } from "express";
import mongoose from "mongoose";
import financialRecordRouter from "./routes/financial-records";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());


const mongoURI: string | undefined = process.env.MONGODB_URL;

if (!mongoURI) {
  throw new Error("MONGODB_URL is not defined in the environment variables");
}

mongoose.connect(mongoURI).then(() => 
    console.log("CONNECTED TO MONGODB")
)
.catch((err) => console.error("Failed to Connect to MongoDB", err));

app.use("/financial-records", financialRecordRouter);

app.listen(port, () => {
    console.log(`Server Running on Port ${port}`);
  });

