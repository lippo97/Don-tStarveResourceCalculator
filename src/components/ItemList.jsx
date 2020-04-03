import React from 'react';
import PropTypes from 'prop-types';
import ItemListItem from './ItemListItem';

function renderItem(item, quantity, handleRemove) {
  return (
    <ItemListItem
      key={[item, quantity]}
      item={item}
      quantity={quantity}
      onClick={handleRemove}
    />
  );
}

function renderData(data, handleRemove) {
  const keys = Object.keys(data);
  if (keys.length > 0) {
    return (
      <div className="item-list">
        { keys.map((key) => renderItem(key, data[key], handleRemove)) }
      </div>
    );
  }
  return (
    <p className="item-list-empty-msg">{'Wow, such empty :('}</p>
  );
}

function renderHeader(data) {
  const n = Object.keys(data).length;
  if (n === 0) {
    return '';
  }
  if (n === 1) {
    return 'Selected item';
  }
  return 'Selected items';
}

export default function ItemList({ data, handleRemove }) {
  return (
    <div className="item-list-section">
      <h2 className="item-list-header">
        { renderHeader(data) }
      </h2>
      { renderData(data, handleRemove) }
    </div>
  );
}

ItemList.propTypes = {
  data: PropTypes.objectOf(PropTypes.number).isRequired,
  handleRemove: PropTypes.func.isRequired,
};
