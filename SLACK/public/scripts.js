const socket = io("http://localhost:3033");

socket.on("nsList", (nsData) => {
  let namespacesDiv = document.querySelector(".namespaces");
  namespacesDiv.innerHTML = "";
  nsData.forEach((ns) => {
    namespacesDiv.innerHTML += `<div class="namespace" ns=${ns.endpoint}>  <img src=${ns.img} /> </div>`;
  });
  Array.from(document.getElementsByClassName("namespace")).forEach((elem) => {
    elem.addEventListener("click", (e) => {
      let nsEndppoint = elem.getAttribute("ns");
      console.log(nsEndppoint);
    });
  });
});

socket.on("msgFromServer", (dataFromServer) => {
  console.log(dataFromServer);
});

socket.emit("msgToServer", { data: "Data from client" });

document.querySelector("#message-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const msgNode = document.querySelector("#user-message");
  const newMessage = msgNode.value;
  socket.emit("newMsgToServer", { text: newMessage });
  msgNode.value = "";
});
