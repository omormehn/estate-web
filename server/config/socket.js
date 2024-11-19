import http from "http";
import { Server } from "socket.io";
import { app } from "..";

const server = http.createServer(app);

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("User  disconnected:", socket.id);
  });

  socket.on("sendMessage", (message) => {
    io.emit("message", message);
  });
});
