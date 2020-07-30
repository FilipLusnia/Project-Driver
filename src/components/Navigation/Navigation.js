import React from 'react';
import {Link} from "react-router-dom";

import logo from '../../scss/Navigation/PD-logo.svg';

export default function Navigation() {

  return (
    <div className="nav">
      <div className="nav_logo_container">
        <img src={logo} alt="logo" className="nav_logo_icon"></img>
        <div className="nav_logo_text">PROJECT: <br/> <span>_DRIVER</span></div>
      </div>

      <div className="nav_links_container">
        <div className="nav_links">
          <Link to="/" className="nav_links_item">Strona główna</Link>
          <Link to="/articles" className="nav_links_item">Czytaj i Trenuj</Link>
          <Link to="/forum" className="nav_links_item">Forum</Link>
          <Link to="/login" className="nav_links_item">Zaloguj</Link>
        </div>

        <div className="nav_decor"></div>
      </div>

    </div>
  )
}
