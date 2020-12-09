import React from 'react';
import _ from 'lodash';
import Filter from './Filter';
import SortingPanel from './SortingPanel';
import TicketView from './TicketView';
import Spinner from './Spinner';
import './TicketList.css';
import logo from './aviasales_logo.svg';
import regeneratorRuntime from 'regenerator-runtime';
import api from '../api/api';
import Ticket from '../api/ticket';

class TicketList extends React.Component {
  constructor() {
    super();
    this.intervalID = null;
    this.state = {
      tickets: [],
      isStopFetching: false,
      sorting: 'cheapest', // cheapest or fastest
      transferFlags: {
        all: false,
        noTransfers: true,
        one: true,
        two: true,
        three: false,
      },
    };
  }

  isAllFlagsChecked = (transferFlags) => transferFlags.noTransfers
    && transferFlags.one
    && transferFlags.two
    && transferFlags.three

  handleChangeSorting = (sorting) => {
    if (sorting === 'cheapest' && this.state.sorting === 'fastest') {
      this.setState({
        sorting: 'cheapest',
      });
    } else if (sorting === 'fastest' && this.state.sorting === 'cheapest') {
      this.setState({
        sorting: 'fastest',
      });
    }
  }

  handleChangeTransferFlag = (transferFlag) => {
    switch (transferFlag) {
      case 'all': {
        this.setState((prevState) => {
          if (prevState.transferFlags.all) {
            return {
              transferFlags: {
                all: false,
                noTransfers: true,
                one: true,
                two: true,
                three: true,
              },
            };
          }
          return {
            transferFlags: {
              all: true,
              noTransfers: true,
              one: true,
              two: true,
              three: true,
            },
          };
        });
        break;
      }
      case 'noTransfers': {
        this.setState((prevState) => {
          const newTransferFlags = {
            ...prevState.transferFlags,
          };
          newTransferFlags.noTransfers = !newTransferFlags.noTransfers;
          if (this.isAllFlagsChecked(newTransferFlags)) {
            newTransferFlags.all = true;
            return {
              transferFlags: newTransferFlags,
            };
          }
          newTransferFlags.all = false;
          return {
            transferFlags: newTransferFlags,
          };
        });
        break;
      }
      case 'one': {
        this.setState((prevState) => {
          const newTransferFlags = {
            ...prevState.transferFlags,
          };
          newTransferFlags.one = !newTransferFlags.one;
          if (this.isAllFlagsChecked(newTransferFlags)) {
            newTransferFlags.all = true;
            return {
              transferFlags: newTransferFlags,
            };
          }
          newTransferFlags.all = false;
          return {
            transferFlags: newTransferFlags,
          };
        });
        break;
      }
      case 'two': {
        this.setState((prevState) => {
          const newTransferFlags = {
            ...prevState.transferFlags,
          };
          newTransferFlags.two = !newTransferFlags.two;
          if (this.isAllFlagsChecked(newTransferFlags)) {
            newTransferFlags.all = true;
            return {
              transferFlags: newTransferFlags,
            };
          }
          newTransferFlags.all = false;
          return {
            transferFlags: newTransferFlags,
          };
        });
        break;
      }
      case 'three': {
        this.setState((prevState) => {
          const newTransferFlags = {
            ...prevState.transferFlags,
          };
          newTransferFlags.three = !newTransferFlags.three;
          if (this.isAllFlagsChecked(newTransferFlags)) {
            newTransferFlags.all = true;
            return {
              transferFlags: newTransferFlags,
            };
          }
          newTransferFlags.all = false;
          return {
            transferFlags: newTransferFlags,
          };
        });
        break;
      }
      default:
        break;
    }
  }

  componentDidMount = () => {
    if (!this.state.isStopFetching) {
      this.intervalID = setInterval(async () => {
        try {
          const { tickets, stop } = await api.fetchTickets();
          if (stop || tickets.length > 5) {
            clearInterval(this.intervalID);
            this.intervalID = null;
            this.setState((prevState) => ({
              tickets: _.sortBy(prevState.tickets.concat(
                tickets.map((ticket) => new Ticket(ticket)),
              ),
              (ticket) => ticket.price),
              isStopFetching: true,
            }));
          } else {
            this.setState((prevState) => ({
              tickets: _.sortBy(prevState.tickets.concat(
                tickets.map((ticket) => new Ticket(ticket)),
              ),
              (ticket) => ticket.price),
              isStopFetching: false,
            }));
          }
        } catch (error) {
          console.error(error);
        }
      }, 2000);
    }
  }

  render = () => (
    <div className="ticket-list">
      <div className="ticket-list__logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="ticket-list__content">
        <div>
          <Filter
            transferFlags={this.state.transferFlags}
            handleChangeTransferFlag={this.handleChangeTransferFlag}
          />
        </div>
        <div>
          <SortingPanel
            sorting={this.state.sorting}
            handleChangeSorting={this.handleChangeSorting}
          />
          {this.state.isStopFetching
            ? _.sortBy(this.state.tickets
              .slice(0, 5)
              .filter((ticket) => {
                let result = false;
                if (this.state.transferFlags.all) {
                  return true;
                }
                if (this.state.transferFlags.noTransfers) {
                  result = ticket.segments.some((segment) => segment.stops.length === 0) || result;
                }
                if (this.state.transferFlags.one) {
                  result = ticket.segments.some((segment) => segment.stops.length === 1) || result;
                }
                if (this.state.transferFlags.two) {
                  result = ticket.segments.some((segment) => segment.stops.length === 2) || result;
                }
                if (this.state.transferFlags.three) {
                  result = ticket.segments.some((segment) => segment.stops.length === 3) || result;
                }
                return result;
              }), (ticket) => {
              switch (this.state.sorting) {
                case 'cheapest': {
                  return ticket.price;
                }
                case 'fastest': {
                  return _.sumBy(ticket.segments, (value) => value.duration);
                }
                default:
                  return 0;
              }
            })
              .map((ticket) => (
                <TicketView
                  key={ticket.id}
                  ticket={ticket}
                />
              ))
            : <Spinner />}
        </div>
      </div>
    </div>
  )
}

export default TicketList;
