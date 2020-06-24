const http = require("http");

const socketio = require("socket.io");
const server = http.createServer((req, res) => {
  res.end("server is up and runnig on port 3031 -->  ");
});

const io = socketio(server);

io.on("connection", (socket) => {
  socket.emit("welcome", "Welcome  to socket io server");
  socket.on("message", (message) => {
    console.log("Message from client " + JSON.stringify(message));
  });
});

server.listen(3031, () => {
  console.log("server is up and runnig on port 3031");
});
