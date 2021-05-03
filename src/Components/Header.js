import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Header extends Component {
  render() {
    return (
      <div>
        <header>
          <h1><span className="blueText">DCX</span> Developer Directory</h1>
          <h2>Find A Developer <span class="whiteText">NOW</span></h2>
        </header>

        <nav id="menu">
          <ul>
            <li className="menuitem"><Link to="/dashboard">Home</Link></li>
            <li className="menuitem"><Link to="/about">About Us</Link></li>
            <li className="menuitem"><Link to="/browse">Browse Developers</Link></li>
            <li className="menuitem"><Link to="/register">Register a New Developer</Link></li>
            <li className="menuitem"><Link to="/contact">Contact Us</Link></li>
            <li className="menuitem"><Link to="/login" onClick={() => localStorage.clear()} >Logout</Link></li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Header;
