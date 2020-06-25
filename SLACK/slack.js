const express = require("express");
const expressApp = express();
const socketio = require("socket.io");
let namespaces = require("./data/namespaces");

expressApp.use(express.static(__dirname + "/public"));

const expressServer = expressApp.listen("3033", () => {
  console.log("listing on port 3033");
});

const io = socketio(expressServer);

io.on("connection", (socket) => {
  let nsData = namespaces.map((ns) => {
    return {
      img: ns.img,
      endpoint: ns.endpoint,
    };
  });

  // just give all name space to the calling client not all the client
  socket.emit("nsList", nsData);
});

namespaces.forEach((namespace) => {
  io.of(namespace.endpoint).on("connection", (socket) => {
    console.log(`${socket.id} has joined ${namespace.endpoint}`);
  });
});
