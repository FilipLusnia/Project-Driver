import React, {useState, useRef, useEffect} from 'react';
import {
  Link
} from "react-router-dom";
import { connect } from 'react-redux';
import { signOut } from '../Redux/Actions/FBauthActions';
import { useScrollPosition } from '@n8tb1t/use-scroll-position'

import ProfileInfo from './ProfileInfo';

import logo from '../../resources/PD-logo.svg';
import burger from '../../resources/menuburger.png';

function LoggedInNavigation(props) {

  const [shouldNavShrink, setShouldNavShrink] = useState(false);
  const [burgerChecked, setBurgerChecked] = useState(false);

  const node = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    }
  }, []);

  const handleClick = e => {
    e.preventDefault();
  };

  console.log(burgerChecked)

  useScrollPosition(({ prevPos, currPos }) => {
    if((currPos.y <= -200)){
      setShouldNavShrink(true)
    } else{
      setShouldNavShrink(false)
    }
  }, [], false, false, 200)

  return (
    <div className={shouldNavShrink ? "nav nav_shrinked" : "nav"}>
      <input id="burgerCheckbox" className="nav_burger" type="checkbox" onChange={e => setBurgerChecked(e.target.checked)} checked={burgerChecked}/>
      <label htmlFor="burgerCheckbox" className={shouldNavShrink ? "nav_burger_label nav_burger_label_shrinked" : "nav_burger_label"}>
        <img src={burger} alt="burger" className="nav_burger_icon"/>
      </label>
      <div className="nav_top">
        <Link to="/" className={shouldNavShrink ? "nav_logo_container nav_logo_container_shrinked" : "nav_logo_container"}>
          <img src={logo} alt="logo" className={shouldNavShrink ? "nav_logo_icon nav_logo_icon_shrinked" : "nav_logo_icon"}/>
          <div className={shouldNavShrink ? "nav_logo_text nav_logo_text_shrinked" : "nav_logo_text"}>PROJECT: <br/> <span>_DRIVER</span></div>
        </Link>
        <ProfileInfo/>
      </div>

      <div ref={node} className={shouldNavShrink ? "nav_links_container nav_links_container_shrinked" : "nav_links_container"}>
        <div className={shouldNavShrink ? "nav_links nav_links_shrinked" : "nav_links"}>
          <Link to="/" className={shouldNavShrink ? "nav_links_item nav_links_item_shrinked" : "nav_links_item"}>Strona główna</Link>
          <Link to="/articles" className={shouldNavShrink ? "nav_links_item nav_links_item_shrinked" : "nav_links_item"}>Artykuły<span>/</span>Quizy</Link>
          <Link to="/forum" className={shouldNavShrink ? "nav_links_item nav_links_item_shrinked" : "nav_links_item"}>Forum</Link>
          <Link to="/profile" className={shouldNavShrink ? "nav_links_item nav_links_item_shrinked" : "nav_links_item"}>Profil</Link>
          <Link to="/" onClick={props.signOut} className={shouldNavShrink ? "nav_links_item nav_links_item_shrinked" : "nav_links_item"}>Wyloguj</Link>
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

