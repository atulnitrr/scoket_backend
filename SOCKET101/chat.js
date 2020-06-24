const express = require("express");
const expressApp = express();
const socketio = require("socket.io");

// http://localhost:9000/chat.html
expressApp.use(express.static(__dirname + "/public"));

const expressServer = expressApp.listen(9000, (data) => {
  console.log("app is running on local 9000");
});

const io = socketio(expressServer);

io.on("connection", (socket) => {
  socket.on("msgFromClient", (dataFromServer) => {
    console.log(JSON.stringify(dataFromServer));
  });

  socket.emit("msgFromServer", { data: "hello from data" });

  socket.on("newMsgToServer", (message) => {
    // emit to all clients
    io.emit("msgToClients", { text: message.text });
    console.log(message);
  });
});
