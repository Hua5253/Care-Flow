import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/users";
import pathwayRouter from "./routes/pathways";
import procedureRouter from "./routes/procedures";
import resourceRouter from "./routes/resources";
import authRouter from "./routes/auth";

const app = express();

app.use(
  cors({
    // origin: "https://care-flow.vercel.app",
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/users", userRouter);
app.use("/pathway", pathwayRouter);
app.use("/procedure", procedureRouter);
app.use("/resource", resourceRouter);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Many Users");
});

const port = process.env.PORT || 4000;

// const MongoDBURI = process.env.NODE_ENV === 'test' ? process.env.MONGODB_TEST_URI : process.env.MONGODB_URI;

const MongoDBURI =
  "mongodb+srv://kangqichen:pyaKOyTUdz6JgKF0@cluster0.rromx.mongodb.net/CareFlow";

mongoose.connect(MongoDBURI!).catch(e => {
  console.error("Connection error", e.message);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
