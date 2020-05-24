const chatRoutes = require("./routes/chatRoutes");
const express = require("express");
const cors = require("cors");
const socketio = require("socket.io");
const http = require("http");
const { addUser, getUser, removeUser, getUsersInRoom } = require("./users");
const { generateMessages } = require("./utils/messages");
const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(chatRoutes);

const PORT = process.env.PORT || 8000;

io.on("connection", (socket) => {
  console.log("A new connection ! ");

  socket.on("join", ({ name, room }, callback) => {
    const { user, error } = addUser({ id: socket.id, name, room });
    if (error) return callback(error);

    socket.emit(
      "message",
      generateMessages("admin", `${user.name}, welcome to ${user.room} room`)
    );
    socket.broadcast
      .to(user.room)
      .emit("message", generateMessages("admin", `${user.name} has joined!`));
    socket.join(user.room);
    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("message", generateMessages(user.name, message));
    callback();
  });

  socket.on("disconnect", () => {
    console.log("A user has left");
  });
});

server.listen(PORT, () => {
  console.log(`Listening from ${PORT}`);
});
