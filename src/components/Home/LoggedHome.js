import React from 'react';
import {connect} from 'react-redux';

function LoggedHome(props) {


  return (
    <div className="loggedHome_container">
      <h1 className="loggedHome_title">
        Cześć, <span>{props.name}</span>!
        Jak ci dziś mija dzień?
      </h1>

      <div className="loggedHome_news_container">
        <p>News:<br/>-</p>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return{
    name: state.firebase.profile.name,
  }
}

export default connect(mapStateToProps)(LoggedHome);
