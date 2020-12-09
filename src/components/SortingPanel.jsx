import React from 'react';
import './SortingPanel.css';
import PropTypes from 'prop-types';
import classnames from 'classnames';

function SortingPanel({ sorting, handleChangeSorting }) {
  return (
    <div className="sorting-tabs">
      <div className={classnames('sorting-tab', { 'sorting-active': sorting === 'cheapest' })} onClick={() => handleChangeSorting('cheapest')}>
        <div>
          Самый дешевый
        </div>
      </div>
      <div className={classnames('sorting-tab', { 'sorting-active': sorting === 'fastest' })} onClick={() => handleChangeSorting('fastest')}>
        <div>
          Самый быстрый
        </div>
      </div>
    </div>
  );
}

SortingPanel.propTypes = {
  sorting: PropTypes.string.isRequired,
  handleChangeSorting: PropTypes.func.isRequired,
};

export default SortingPanel;
