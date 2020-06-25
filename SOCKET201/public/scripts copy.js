const socket = io("http://localhost:3031");
const socket2 = io("http://localhost:3031/admin");

socket2.on("connect", (data) => {
  console.log(socket2.id);
});

socket2.on("welcome", (msg) => {
  console.log(msg);
});
socket.on("connect", () => {
  console.log(socket.id);
});

socket.on("msgFromServer", (dataFromServer) => {
  console.log(dataFromServer);
});

socket.emit("msgFromClient", { data: "Data from client" });

document.querySelector("#message-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const msgNode = document.querySelector("#user-message");
  const newMessage = msgNode.value;
  socket.emit("newMsgToServer", { text: newMessage });
  msgNode.value = "";
});

socket.on("msgToClients", (msg) => {
  document.querySelector("#messages").innerHTML += `<li>${msg.text}</li>`;
});
