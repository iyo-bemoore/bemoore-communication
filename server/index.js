const chatRoutes = require("./routes/chatRoutes");
const express = require("express");
const cors = require("cors");
const socketio = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(chatRoutes);

const PORT = process.env.PORT || 8000;

io.on("connection", (socket) => {
  console.log("A new connection ! ");

  socket.on("join", ({ name, room }) => {
    console.log(name, room);
  });

  socket.on("disconnect", () => {
    console.log("A user has left");
  });
});

server.listen(PORT, () => {
  console.log(`Listening from ${PORT}`);
});
