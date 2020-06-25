function joinRoom(roomname) {
  nsSocket.emit("joinRoom", roomname, (newNumberOfMembers) => {
    document.querySelector(
      ".curr-room-num-users"
    ).innerHTML = `${newNumberOfMembers} <span class="glyphicon glyphicon-user"></span
    >`;
  });
}
