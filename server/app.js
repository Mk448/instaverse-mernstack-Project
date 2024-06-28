import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import storyRouter from './routes/stories.js';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "32mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "32mb", extended: true }));
app.use(cors());

app.use("/stories", storyRouter);
app.use("/user", userRoutes);

const MONGO_URI = "mongodb+srv://kmohank428:369qFx0ITfgSn8Ou@cluster0.wzlyekt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const PORT = 5001;

const connectDB = async () => {
    try {
       await mongoose.connect(MONGO_URI)
       app.listen(PORT, () => console.log(`Server runnung at port: ${PORT}`));
    } catch(err) {
        console.error("Connection to MongoDB failed", err.message);
    }
}

connectDB();

mongoose.connection.on("open", () => console.log("Connection to database has been established successfully"));
mongoose.connection.on("error", (error) => console.log("err"));