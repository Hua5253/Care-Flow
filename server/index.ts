import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/users";
import pathwayRouter from "./routes/pathways";
import procedureRouter from "./routes/procedures";
import resourceRouter from "./routes/resources";
import authRouter from "./routes/auth";
import { Server } from 'socket.io';
import http from 'http';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173'
  }
});
const chat = io.of('/chatroom').on('connection', (socket) => {
  console.log('connect socket successfully!')
  try {
    socket.on('create or join', (roomId, userId) => {
      socket.join(roomId);
      chat.to(roomId).emit('joined', roomId, userId);
    })
    socket.on('chat', (roomId, userId, chatText) => {
      console.log('client', roomId, userId, chatText)
      chat.to(roomId).emit('chat', roomId, userId, chatText)
    })
    socket.on('disconnect', () => {
      console.log('someone disconnected')
    })
  } catch (e) {
    console.error('connect socket error:', e)
  }

})
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

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
