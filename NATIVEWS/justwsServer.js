const http = require("http");

// https://www.npmjs.com/package/ws#api-docs

const websocket = require("ws");

const server = http.createServer((req, res) => {
  res.end("I am up and running ");
});

const websocketServer = new websocket.Server({ server: server });

websocketServer.on("headers", (headers, req) => {
  console.log(headers);
  // console.log(req);
});

websocketServer.on("connection", (ws, req) => {
  ws.send("Hello atul");

  ws.on("message", (msg) => {
    console.log(msg);
  });
});

server.listen(3031, () => {
  console.log(" Data Upa nd unnin g");
});
