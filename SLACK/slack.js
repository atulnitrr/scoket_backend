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
    nsSocket.emit("nsRoomLoad", namespace.rooms);
    // JOIN ROOM
    nsSocket.on("joinRoom", (roomToJoin, callBack) => {
      let allRooms = Object.keys(nsSocket.rooms);
      if (allRooms.length > 1) {
        const roomToleave = allRooms[1];
        nsSocket.leave(roomToleave);
        updateUserCount(namespace, roomToleave);
      }

      nsSocket.join(roomToJoin);
      // io.of("/wiki")
      //   .in(roomToJoin)
      //   .clients((error, clients) => {
      //     callBack(clients.length);
      //   });
      //
      const nsRoom = namespace.rooms.find((room) => {
        return room.roomTitle === roomToJoin;
      });
      if (nsRoom !== undefined) {
        nsSocket.emit("histroyCatchUp", nsRoom.history ? nsRoom.history : []);
        updateUserCount(namespace, roomToJoin);
      }

      //
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
      const nsRoom = namespace.rooms.find((room) => {
        return room.roomTitle === roomTitle;
      });

      console.log(nsRoom);
      nsRoom.addMessage(fullMsg);
      io.of(namespace.endpoint).to(roomTitle).emit("messageToClients", fullMsg);
    });
    //
  });
});

function updateUserCount(namespace, roomToJoin) {
  io.of(namespace.endpoint)
    .to(roomToJoin)
    .clients((error, clients) => {
      io.of(namespace.endpoint)
        .to(roomToJoin)
        .emit("updateMembers", clients.length);
    });
}
