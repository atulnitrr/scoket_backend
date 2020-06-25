const socket = io("http://localhost:3031");
const socket2 = io("http://localhost:3031/admin");

socket.on("msgFromServer", (dataFromServer) => {
  console.log(dataFromServer);
});

socket.on("joined", (msg) => {
  console.log(msg);
});

socket.emit("msgToServer", { data: "Data from client" });

socket2.on("welcome", (data) => {
  console.log(data);
});

document.querySelector("#message-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const msgNode = document.querySelector("#user-message");
  const newMessage = msgNode.value;
  socket.emit("newMsgToServer", { text: newMessage });
  msgNode.value = "";
});
