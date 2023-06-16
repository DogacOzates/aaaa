const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const PORT = 8000;

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/chat.html");
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("chat message", (message) => {
    console.log("Message: " + message);
    io.emit("chat message", message);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});
