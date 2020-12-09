import React from 'react';
import PropTypes from 'prop-types';
import './Filter.css';

function Filter({ transferFlags, handleChangeTransferFlag }) {
  return (
    <div className="filter">
      <div className="filter__title">Количество пересадок</div>
      <div className="filter__checkboxes">
        <div className="filter__checkbox" onClick={() => handleChangeTransferFlag('all')}>
          <input type="checkbox" checked={transferFlags.all} onChange={() => {}} />
          <label className="filter__checkbox__label" htmlFor="scales">Все</label>
        </div>
        <div className="filter__checkbox" onClick={() => handleChangeTransferFlag('noTransfers')}>
          <input type="checkbox" checked={transferFlags.noTransfers} onChange={() => {}} />
          <label className="filter__checkbox__label" htmlFor="scales">Без пересадок</label>
        </div>
        <div className="filter__checkbox" onClick={() => handleChangeTransferFlag('one')}>
          <input type="checkbox" checked={transferFlags.one} onChange={() => {}} />
          <label className="filter__checkbox__label" htmlFor="scales">1 пересадка</label>
        </div>
        <div className="filter__checkbox" onClick={() => handleChangeTransferFlag('two')}>
          <input type="checkbox" checked={transferFlags.two} onChange={() => {}} />
          <label className="filter__checkbox__label" htmlFor="scales">2 пересадки</label>
        </div>
        <div className="filter__checkbox" onClick={() => handleChangeTransferFlag('three')}>
          <input type="checkbox" checked={transferFlags.three} onChange={() => {}} />
          <label className="filter__checkbox__label" htmlFor="scales">3 пересадки</label>
        </div>
      </div>
    </div>
  );
}

Filter.propTypes = {
  transferFlags: PropTypes.exact({
    all: PropTypes.bool,
    noTransfers: PropTypes.bool,
    one: PropTypes.bool,
    two: PropTypes.bool,
    three: PropTypes.bool,
  }),
  handleChangeTransferFlag: PropTypes.func,
};

Filter.defaultProps = {
  transferFlags: {
    all: true,
    noTransfers: true,
    one: true,
    two: true,
    three: true,
  },
  handleChangeTransferFlag: () => {},
};

export default Filter;
