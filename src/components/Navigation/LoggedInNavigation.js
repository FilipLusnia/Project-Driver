import React from 'react';
import {
  Link
} from "react-router-dom";
import { connect } from 'react-redux';
import { signOut } from '../Redux/Actions/FBauthActions';

import logo from '../../scss/Navigation/PD-logo.svg';

function LoggedInNavigation(props) {

  return (
    <div className="nav">
      <div className="nav_logo_container">
        <img src={logo} alt="logo" className="nav_logo_icon"></img>
        <div className="nav_logo_text">PROJECT: <br/> <span>_DRIVER</span></div>
      </div>

      <div className="nav_links_container">
        <div className="nav_links">
          <Link to="/" className="nav_links_item">Strona główna</Link>
          <Link to="/articles" className="nav_links_item">Artykuły</Link>
          <Link to="/forum" className="nav_links_item">Forum</Link>
          <Link to="/profile" className="nav_links_item">Profil</Link>
          <Link to="/" onClick={props.signOut} className="nav_links_item">Wyloguj</Link>
        </div>

        <div className="nav_decor"></div>
      </div>

    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(LoggedInNavigation)

