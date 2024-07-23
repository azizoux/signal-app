import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import messageRouter from "./routes/message.route.js";

import { Server } from "socket.io";
import http from "http";
import { log } from "console";

const app = express();
const port = 8000;
const url = "mongodb://localhost:27017/chat_db";

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Erreur connecting to MongoDB...", err);
  });

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/messages", messageRouter);

app.listen(port, () => {
  console.log(`Server runing on port ${port} `);
});

const server = http.createServer(app);
const io = new Server(server);
const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  const userId = socket.handshake.query.userId;
  console.log("userId", userId);
  if (userId !== "undefined") {
    userSocketMap[userId] = socket.id;
  }
  console.log("user socket data", userSocketMap);
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete userSocketMap[userId];
  });
  socket.on("sendMessage", ({ senderId, receiverId, message }) => {
    const receiverSocketId = userSocketMap[receiverId];
    console.log("receiver Id", receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receiveMessage", {
        senderId,
        message,
      });
    }
  });
});
import Message from "./models/message.model.js";
app.post("/api/sendMessage", async (req, res) => {
  try {
    console.log(req.body);
    const { senderId, receiverId, message } = req.body;
    const newMessage = new Message({
      senderId,
      receiverId,
      content: message,
    });
    const createdMessage = await newMessage.save();
    const receiverSocketId = userSocketMap[receiverId];
    if (receiverSocketId) {
      console.log("emitting receiveMessage event to the receiver", receiverId);
      io.to(receiverSocketId).emit("newMessage", newMessage);
    } else {
      console.log("Receiver socket ID not found");
      return res.status(404).json("Receiver socket ID not found");
    }
    res.status(201).json(createdMessage);
  } catch (error) {
    console.log("ERROR", error);
  }
});

server.listen(6000, () => {
  console.log("Socket.io running on port 6000");
});
