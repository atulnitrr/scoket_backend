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
  io.of(namespace.endpoint).on("connection", (nsSocket) => {
    console.log(`${nsSocket.id} has joined ${namespace.endpoint}`);
    nsSocket.emit("nsRoomLoad", namespaces[0].rooms);
    // JOIN ROOM
    nsSocket.on("joinRoom", (roomToJoin, callBack) => {
      nsSocket.join(roomToJoin);
      io.of("/wiki")
        .in(roomToJoin)
        .clients((error, clients) => {
          callBack(clients.length);
        });
    });
    //

    nsSocket.on("newMsgToServer", (msg) => {
      const fullMsg = {
        text: msg.text,
        time: Date.now(),
        username: "Atul",
        avatar: "https://via.placeholder.com/30",
      };
      const roomTitles = Object.keys(nsSocket.rooms);
      const roomTitle = roomTitles[1];
      io.of("/wiki").to(roomTitle).emit("messageToClients", fullMsg);
    });
    //
  });
});
