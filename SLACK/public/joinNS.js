function joinNS(endpoint) {
  if (nsSocket) {
    nsSocket.close();
    document
      .querySelector(".message-form")
      .removeEventListener("submit", formSubmission);
  }
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
        joinRoom(e.target.innerText);
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
    const msgELement = buildHtml(msg);
    document.querySelector("#messages").innerHTML += msgELement;
  });

  document
    .querySelector(".message-form")
    .addEventListener("submit", formSubmission);

  //
}

function formSubmission(event) {
  event.preventDefault();
  const msgNode = document.querySelector("#user-message");
  const newMessage = msgNode.value;
  nsSocket.emit("newMsgToServer", { text: newMessage });
  msgNode.value = "";
}

function buildHtml(msg) {
  const date = new Date(msg.time);
  const newHtml = `<li>

  <div class="user-image">
    <img src=${msg.avatar} />
  </div>
  <div class="user-message">
    <div class="user-name-time">${
      msg.username
    } <span>${date.toLocaleDateString()}   ${date.toLocaleTimeString()}</span></div>
    <div class="message-text">${msg.text}</div>
  </div>
</li>`;

  return newHtml;
}
