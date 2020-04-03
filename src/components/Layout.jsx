import React from 'react';
import PropTypes from 'prop-types';

export default function Layout({ children }) {
  return (
    <>
      <div className="navbar">
        <img
          className="navbar-img"
          alt="don't starve logo"
          src="https://vignette.wikia.nocookie.net/dont-starve-game/images/5/56/LogoTemp.png/revision/latest?cb=20121118044337"
        />
        <h1 className="navbar-title">resource calculator</h1>
      </div>
      <div className="content">
        { children }
      </div>

    </>
  );
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
