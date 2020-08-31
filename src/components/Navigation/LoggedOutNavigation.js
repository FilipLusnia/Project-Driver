import React from 'react';
import {
  Link
} from "react-router-dom";
import {connect} from 'react-redux';
import { useScrollPosition } from '@n8tb1t/use-scroll-position'

import logo from '../../resources/PD-logo.svg';

function LoggedOutNavigation() {

  const navPointer = React.createRef();
  const navLogoPointer = React.createRef();
  const logoImgPointer = React.createRef();
  const logoTextPointer = React.createRef();
  const navLinksPointer = React.createRef();

  useScrollPosition(({ prevPos, currPos }) => {
    if((currPos.y <= -200)){
      navPointer.current.className = 'nav nav_shrinked';
      navLogoPointer.current.className = 'nav_logo_container nav_logo_container_shrinked';
      logoImgPointer.current.className = 'nav_logo_icon nav_logo_icon_shrinked';
      logoTextPointer.current.className = 'nav_logo_text nav_logo_text_shrinked';
      navLinksPointer.current.className = 'nav_links_container nav_links_container_shrinked';
    } else{
      navPointer.current.className = 'nav';
      navLogoPointer.current.className = 'nav_logo_container';
      logoImgPointer.current.className = 'nav_logo_icon';
      logoTextPointer.current.className = 'nav_logo_text';
      navLinksPointer.current.className = 'nav_links_container';
    }
  }, [], false, false, 200)

  return (
    <div ref={navPointer} className="nav">
      <div ref={navLogoPointer} className="nav_logo_container">
        <img ref={logoImgPointer} src={logo} alt="logo" className="nav_logo_icon"></img>
        <div ref={logoTextPointer} className="nav_logo_text">PROJECT: <br/> <span>_DRIVER</span></div>
      </div>

      <div ref={navLinksPointer} className="nav_links_container">
        <div className="nav_links">
          <Link to="/" className="nav_links_item">Strona główna</Link>
          <Link to="/articles" className="nav_links_item">Artykuły<span>/</span>Quizy</Link>
          <Link to="/forum" className="nav_links_item">Forum</Link>
          <Link to="/login" className="nav_links_item">Zaloguj</Link>
          <Link to="/register" className="nav_links_item">Zarejestruj się</Link>
        </div>

        <div className="nav_decor"></div>
      </div>

    </div>
  )
}

export default connect(null)(LoggedOutNavigation)
