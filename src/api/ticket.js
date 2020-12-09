import * as uuid from 'uuid';

class Ticket {
  constructor(options) {
    this.id = uuid.v4();
    this.price = options.price;
    this.logo = options.carrier;
    this.segments = options.segments;
  }
}

export default Ticket;
