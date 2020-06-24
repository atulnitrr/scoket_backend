const http = require("http");

const socketIo = require("socket.io");

const server = http.createServer((req, res) => {
  res.end("Hello from data");
});

const io = socketIo(server);

io.on("connection", (socket) => {
  socket.emit("fromServer", "Hello from server ");

  socket.on("fromClient", (message) => {
    console.log(JSON.stringify(message));
  });
});

server.listen("3031", () => {
  console.log("server is up and running ");
});
