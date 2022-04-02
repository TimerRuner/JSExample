class Favourite {
  constructor () {
    this.ticketInfo = [];
  }

  setTicketInfo(data) {
    this.ticketInfo.push(data);
  }
  getTicketInfo(){
    return this.ticketInfo;
  }
}

const favourite = new Favourite();

export default favourite;