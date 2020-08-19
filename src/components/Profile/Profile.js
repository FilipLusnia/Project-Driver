import React, { useEffect } from 'react';
import {
  useHistory
} from "react-router-dom";
import Navigation from '../Navigation/Navigation';
import Footer from '../Navigation/Footer';
import icon from '../../resources/user-icon.png';
import {connect} from 'react-redux';
import {deleteAcc} from '../Redux/Actions/FBauthActions';

function Profile(props) {
  
  const {fbauth, points, level} = props;
  const history = useHistory();

  useEffect(()=> {
    if(!fbauth.uid){
      history.push('/')
    }
  }, [history, fbauth.uid]);

  const handleClick = e => {
    e.preventDefault();
  }

  return (
    <>
      <Navigation/>
      <div className="profile_container">
        <div className="profile_leftside">
          <img src={icon} alt="profile pic" className="profile_picture"></img>
          <p>{props.name}</p>
          <p>{props.surName}</p>
          <button className="profile_delete_btn" onClick={handleClick}>Usuń konto (niedostępne)</button>
        </div>
        <div className="profile_rightside">
          <h2>TWÓJ PROFIL:</h2>
          <ul>
            <li>Ilość zebranych punktów: {points}</li>
            <li>Poziom: {level}</li>
            <li>Ilość punktów do następnego poziomu: WIP</li>
            <li>Ukończone quizy: WIP</li>
            <li>Quizy ukończone z pozytywnym wynikiem: WIP</li>
          </ul>
        </div>
      </div>
      <Footer/>
    </>
  )
}

const mapStateToProps = state => {
  return {
    fbauth: state.firebase.auth,
    points: state.firebase.profile.points,
    name: state.firebase.profile.name,
    surName: state.firebase.profile.surname,
    level: state.firebase.profile.level
  }
}

const mapDispatchToProps = dispatch => {
  return {
      deleteAcc: () => dispatch(deleteAcc())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);