const express = require("express");
const expressApp = express();
const socketio = require("socket.io");

let namespaces = require("./data/namespaces");
console.log(namespaces);

expressApp.use(express.static(__dirname + "/public"));

const expressServer = expressApp.listen("3033", () => {
  console.log("listing on port 3033");
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
