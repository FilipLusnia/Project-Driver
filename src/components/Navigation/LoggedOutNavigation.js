import React, {useState, useRef, useEffect} from 'react';
import {Link, NavLink} from "react-router-dom";
import {connect} from 'react-redux';
import { useScrollPosition } from '@n8tb1t/use-scroll-position'

import logo from '../../resources/PD-logo.svg';
import burger from '../../resources/menuburger.png';

function LoggedOutNavigation() {

  const [shouldNavShrink, setShouldNavShrink] = useState(false);
  const [burgerChecked, setBurgerChecked] = useState(false);

  const navNode = useRef();
  const burgerNode = useRef();

  const activeStyle = {
    color: 'rgb(83, 101, 255)'
  }

  useEffect(() => {

    const handleClick = e => {
      e.preventDefault();

      if(navNode.current.contains(e.target) || burgerNode.current.contains(e.target)) {
        return;
      }
      setBurgerChecked(false);
    }

    if(burgerChecked){
      document.addEventListener("mousedown", handleClick);
    } else {
      document.removeEventListener("mousedown", handleClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleClick);
    }
  }, [burgerChecked]);

  useScrollPosition(({ prevPos, currPos }) => {
    if((currPos.y <= -200)){
      setShouldNavShrink(true)
    } else{
      setShouldNavShrink(false)
    }
  }, [], false, false, 200)

  return (
    <div className={shouldNavShrink ? "nav nav_shrinked" : "nav"}>

      <input id="burgerCheckbox" className="nav_burger" type="checkbox" onChange={() => setBurgerChecked(!burgerChecked)} checked={burgerChecked}/>
      <label htmlFor="burgerCheckbox" className={shouldNavShrink ? "nav_burger_label nav_burger_label_shrinked" : "nav_burger_label"}>
        <img ref={burgerNode} src={burger} alt="burger" className="nav_burger_icon"/>
      </label>

      <div className="nav_top">
        <Link to="/" className={shouldNavShrink ? "nav_logo_container nav_logo_container_shrinked" : "nav_logo_container"}>
          <img src={logo} alt="logo" className={shouldNavShrink ? "nav_logo_icon nav_logo_icon_shrinked" : "nav_logo_icon"}/>
          <div className={shouldNavShrink ? "nav_logo_text nav_logo_text_shrinked" : "nav_logo_text"}>PROJECT: <br/> <span>_DRIVER</span></div>
        </Link>
      </div>

      <div ref={navNode} className={shouldNavShrink ? "nav_links_container nav_links_container_shrinked" : "nav_links_container"}>
        <div className={shouldNavShrink ? "nav_links nav_links_shrinked" : "nav_links"}>

          <NavLink exact to="/" onClick={() => setBurgerChecked(!burgerChecked)} activeStyle={activeStyle} className={shouldNavShrink ? "nav_links_item nav_links_item_shrinked" : "nav_links_item"}>Strona główna</NavLink>
          
          <NavLink exact to="/articles" onClick={() => setBurgerChecked(!burgerChecked)} activeStyle={activeStyle} className={shouldNavShrink ? "nav_links_item nav_links_item_shrinked" : "nav_links_item"}>Artykuły<span>/</span>Quizy</NavLink>
          
          <NavLink exact to="/forum" onClick={() => setBurgerChecked(!burgerChecked)} activeStyle={activeStyle} className={shouldNavShrink ? "nav_links_item nav_links_item_shrinked" : "nav_links_item"}>Forum</NavLink>
          
          <NavLink exact to="/login" onClick={() => setBurgerChecked(!burgerChecked)} activeStyle={activeStyle} className={shouldNavShrink ? "nav_links_item nav_links_item_shrinked" : "nav_links_item"}>Zaloguj</NavLink>
          
          <NavLink exact to="/register" onClick={() => setBurgerChecked(!burgerChecked)} activeStyle={activeStyle} className={shouldNavShrink ? "nav_links_item nav_links_item_shrinked" : "nav_links_item"}>Zarejestruj się</NavLink>
         
        </div>
        <div className="nav_decor"/>
      </div>

    </div>
  )
}

export default connect(null)(LoggedOutNavigation)
