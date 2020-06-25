class Namespace {
  constructor(id, nsTitle, img, endpoint) {
    this.id = id;
    this.nsTitle = nsTitle;
    this.img = img;
    this.endpoint = endpoint;
    this.rooms = [];
  }

  addRoom(roobObj) {
    this.rooms.push(roobObj);
  }
}

module.exports = Namespace;
