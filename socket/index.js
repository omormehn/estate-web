import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const io = new Server({
  cors: {
    origin: "http://localhost:5173",
  },
});

let onlineUser = [];

const addUser = (userId, socketId) => {
  const userExits = onlineUser.find((user) => user.userId === userId);
  if (!userExits) {
    onlineUser.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUser.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
  });

  socket.on("sendMessage", ({ receiverId, data }) => {
     console.log("Current online users:", onlineUser);
    const receiver = getUser(receiverId);
    console.log("ee", receiver);
    if (receiver) {
      io.to(receiver.socketId).emit("getMessage", data);
      console.log("ee", receiver)
    }
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

io.listen(PORT);
