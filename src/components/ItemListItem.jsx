import React from 'react';
import PropTypes from 'prop-types';

export default function ItemListItem({ item, quantity, onClick }) {
  return (
    <div key={item} className="item">
      <div
        className="item-img-cropper"
      >
        <img
          src="https://vignette.wikia.nocookie.net/dont-starve-game/images/b/b2/Campfire_Build.png/revision/latest?cb=20131205161805"
          className="item-img"
          alt=""
        />
      </div>
      <span className="item-description">
        {`${item} `}
      </span>
      <div className="item-quantity-box">
        <span className="item-quantity">
          {`${quantity}`}
        </span>
        <button
          type="button"
          className="item-button"
          onClick={() => onClick(item)}
        >
          ━
        </button>
      </div>
    </div>
  );
}

ItemListItem.propTypes = {
  item: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};
