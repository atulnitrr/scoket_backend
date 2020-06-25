function joinNS(endpoint) {
  nsSocket = io(`http://localhost:3033${endpoint}`);

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
    Array.from(roomNodes).forEach((elem) => {
      elem.addEventListener("click", (e) => {
        console.log(e.target.innerText);
      });
    });

    //
    let topRoom = document.querySelector(".room");
    const topRoomName = topRoom.innerText;
    joinRoom(topRoomName);

    //
  });

  nsSocket.on("messageToClients", (msg) => {
    console.log(msg);
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

  //
}

function buildHtml(fullMsg) {
  const newHtml = `<li>
  <div class="user-image">
    <img src="https://via.placeholder.com/30" />
  </div>
  <div class="user-message">
    <div class="user-name-time">rbunch <span>1:25 pm</span></div>
    <div class="message-text">I went running today.</div>
  </div>
</li>`;

  return newHtml;
}
