const express = require("express");
const expressApp = express();
const socketio = require("socket.io");

// http://localhost:9000/chat.html
expressApp.use(express.static(__dirname + "/public"));

const expressServer = expressApp.listen(3031, (data) => {
  console.log("app is running on local 9000");
});

const io = socketio(expressServer);

io.on("connection", (socket) => {
  socket.on("msgToServer", (dataFromClient) => {
    console.log(JSON.stringify(dataFromClient));
  });
  socket.emit("msgFromServer", { data: "hello from server data" });

  socket.join("level1");
  socket
    .to("level1")
    .emit("joined", `${socket.id} says I have joined the room`);
});

io.of("/admin").on("connection", (socket) => {
  console.log("connecteted to admin");
  io.of("/admin").emit("welcome", "Welcome from admin name space ");
});
