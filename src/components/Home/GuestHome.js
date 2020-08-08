import React from 'react';
import { Link } from "react-router-dom";

export default function GuestHome() {


  return (
    <div className="guestHome_container">
      <h1 className="guestHome_title">Witaj w Project: Driver</h1>

      <p className="guestHome_title_secondary">
        Pokaż innym,
        że ogarniasz przepisy drogowe.
      </p>

      <p className="guestHome_btntitle">
        Załóż konto w kilka sekund i zbieraj punkty.
      </p>
      <Link to="/register" className="guestHome_registerbtn">Zaczynajmy</Link>
      <Link to="/login" className="guestHome_loginbtn">Mam już konto</Link>
    </div>
  )
}
