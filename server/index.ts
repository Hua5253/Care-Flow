import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from './routes/users';

const app = express();

app.use(cors({
    // origin: "https://care-flow.vercel.app",
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json());

app.use('/users', userRouter);

app.get('/', (req, res) => {
    res.send("Many Users");
})

const port = process.env.PORT || 4000;

// const MongoDBURI = process.env.NODE_ENV === 'test' ? process.env.MONGODB_TEST_URI : process.env.MONGODB_URI;

const MongoDBURI = 'mongodb+srv://kangqichen:pyaKOyTUdz6JgKF0@cluster0.rromx.mongodb.net/CareFlow'

mongoose.connect(MongoDBURI!).catch((e) => {
    console.error("Connection error", e.message);
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})