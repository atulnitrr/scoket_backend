function joinRoom(roomname) {
  nsSocket.emit("joinRoom", roomname, (newNumberOfMembers) => {
    document.querySelector(
      ".curr-room-num-users"
    ).innerHTML = `${newNumberOfMembers} <span class="glyphicon glyphicon-user"></span
    >`;
  });

  nsSocket.on("histroyCatchUp", (history) => {
    const messageUl = document.querySelector("#messages");
    messageUl.innerHTML = "";
    history.forEach((msg) => {
      const newMsg = buildHtml(msg);
      const currentMessage = messageUl.innerHTML;
      messageUl.innerHTML = currentMessage + newMsg;
    });
    // to bottom of div
    messageUl.scroll(0, messageUl.scrollHeight);
  });

  nsSocket.on("updateMembers", (memebersCount) => {
    document.querySelector(
      ".curr-room-num-users"
    ).innerHTML = `${memebersCount} <span class="glyphicon glyphicon-user"></span
    >`;

    document.querySelector(".curr-room-text").innerText = `${roomname}`;
  });
}
