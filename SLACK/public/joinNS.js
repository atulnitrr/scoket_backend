function joinNs(endpoint) {
  const nsSocket = io(`http://localhost:3033${endpoint}`);

  nsSocket.on("nsRoomLoad", (nsRooms) => {
    let roomList = document.querySelector(".room-list");
    roomList.innerHTML = "";
    nsRooms.forEach((room) => {
      let glyph = room.privateRoom ? "lock" : "globe";
      roomList.innerHTML += `<li class="room"><span class="glyphicon glyphicon-${glyph}"></span>${room.roomTitle}
    </li>`;
    });

    //room nodes
    let roomNodes = document.getElementsByClassName("room");
    console.log(roomNodes);
    Array.from(roomNodes).forEach((elem) => {
      elem.addEventListener("click", (e) => {
        console.log("ffff");
      });
    });
  });

  nsSocket.on("messageToClients", (msg) => {
    document.querySelector("#messages").innerHTML += `<li>${msg.text}</li>`;
  });

  document
    .querySelector(".message-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const msgNode = document.querySelector("#user-message");
      const newMessage = msgNode.value;
      nsSocket.emit("newMsgToServer", { text: newMessage });
      msgNode.value = "";
    });
}
