import React from 'react';
import '../styles/Nav.css';


const Nav = ({ toggleHover, search}) => (
  <div className='nav-wrapper'>
    <h4 className='query' onClick={search}>Search</h4>
    <h4 className='public-holiday' onMouseEnter={toggleHover} onMouseLeave={toggleHover}>Public Holidays</h4>
  </div>
);

export default Nav;
