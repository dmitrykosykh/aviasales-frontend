import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import Ticket from '../api/ticket';
import './TicketView.css';

function TicketView({ ticket }) {
  const renderToDepartureTime = (date) => {
    const departureTime = moment.utc(date);
    return departureTime.format('HH:mm');
  };

  const renderToArrivalTime = (date, duration) => {
    const arrivalTime = moment.utc(date);
    return arrivalTime.add(duration, 'minutes').format('HH:mm');
  };

  const renderDuration = (duration) => `${_.round(moment.duration(duration, 'minutes').asHours())}ч ${moment.duration(duration, 'minutes').minutes()}м`;

  const renderTransferTitle = (stops) => {
    if (stops.length === 0) {
      return 'Без пересадок';
    } if (stops.length === 1) {
      return '1 пересадка';
    } if (stops.length > 1 || stops.length < 5) {
      return `${stops.length} пересадки`;
    }
    return `${stops.length} пересадок`;
  };

  return (
    <div className="ticket">
      <div className="ticket__header">
        <div className="ticket-price">{`${ticket.price.toLocaleString('ru-RU')} Р`}</div>
        <div className="ticket-logo"><img src={`https://pics.avs.io/99/36/${ticket.logo}.png`} alt="Logo" /></div>
      </div>

      {ticket.segments.map((element) => (
        <div className="ticket__segment">
          <div className="ticket__route">
            <div className="ticket__title">{`${element.origin} - ${element.destination}`}</div>
            <div className="ticket__value">{`${renderToDepartureTime(element.date)} - ${renderToArrivalTime(element.date, element.duration)}`}</div>
          </div>
          <div className="ticket__length">
            <div className="ticket__title">В пути</div>
            <div className="ticket__value">{renderDuration(element.duration)}</div>
          </div>
          <div className="ticket__stops">
            <div className="ticket__title">
              {renderTransferTitle(element.stops)}
            </div>
            <div className="ticket__value">{element.stops.join(', ')}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

TicketView.propTypes = {
  ticket: PropTypes.instanceOf(Ticket),
};

TicketView.defaultProps = {
  ticket: new Ticket({
    price: '13 400 Р',
    logo: '',
    segments: [{
      origin: 'MOW',
      destination: 'HKT',
      departureTime: '10:45',
      arrivalTime: '08:00',
      duration: '21ч 15м',
      stops: ['HKG', 'JNB'],
    },
    {
      origin: 'MOW',
      destination: 'HKT',
      departureTime: '10:45',
      arrivalTime: '08:00',
      duration: '21ч 15м',
      stops: ['HKG', 'JNB'],
    }],
  }),
};

export default TicketView;
