
class FavouriteTicket {
  constructor(){
    this.favouriteContainer = document.querySelector('.dropdown-content');
    this.data = null;
  }
  init(){
    if(!this.data){
      this.showEmptyMsg();
    }
  }
  renderCount(){
    return this.data.length;
  }
  removeItem(i){
    this.data.forEach((item, index) => {
      if(item.index === i){
        this.data.splice(index, 1);
      }
    });
  }
  checkData(){
    if(!this.data[0]){
      this.showEmptyMsg();
    }
  }
  renderFavourite(data){
    this.data = data;
    this.clearContainer();


    let fragment = '';

    this.data.forEach(ticket => {
      fragment += this.favouriteTicketTemplate(ticket);
    });

    this.favouriteContainer.insertAdjacentHTML('afterbegin', fragment);
  }

  clearContainer() {
    this.favouriteContainer.innerHTML = '';
  }

  showEmptyMsg(){
    this.favouriteContainer.insertAdjacentHTML('afterbegin', this.emptyMessageTemplate());
  }

  emptyMessageTemplate(){
    return `<div class="tickets-empty-res-msg">Пока нет выбраных билетов</div>`;
  }

  favouriteTicketTemplate(data){
    return `
      <div class="favorite-item  d-flex align-items-start" data-index="${data.index}">
        <img
          src="${data.airline_logo}"
          class="favorite-item-airline-img"
        />
        <div class="favorite-item-info d-flex flex-column">
          <div
            class="favorite-item-destination d-flex align-items-center"
          >
            <div class="d-flex align-items-center mr-auto">
              <span class="favorite-item-city">${data.origin_name}</span>
              <i class="medium material-icons">flight_takeoff</i>
            </div>
            <div class="d-flex align-items-center">
              <i class="medium material-icons">flight_land</i>
              <span class="favorite-item-city">${data.destination_name}</span>
            </div>
          </div>
          <div class="ticket-time-price d-flex align-items-center">
            <span class="ticket-time-departure">${data.departure_at}</span>
            <span class="ticket-price ml-auto">${data.price}</span>
          </div>
          <div class="ticket-additional-info">
            <span class="ticket-transfers">${data.transfers}</span>
            <span class="ticket-flight-number">${data.flight_number}</span>
          </div>
          <a
            class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto"
            >Delete</a
          >
        </div>
      </div>
    `;

  }
}

const favouriteTicket = new FavouriteTicket();

export default favouriteTicket;