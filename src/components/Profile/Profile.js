import React, { useEffect } from 'react';
import {
  useHistory
} from "react-router-dom";
import Navigation from '../Navigation/Navigation';
import icon from '../../resources/user-icon.png';
import {connect} from 'react-redux';
import {deleteAcc} from '../Redux/Actions/FBauthActions';

function Profile(props) {
  
  const {fbauth, points} = props;
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
          <button className="profile_delete_btn" onClick={handleClick}>Usuń konto WIP</button>
        </div>
        <div className="profile_rightside">
          <h2>TWÓJ PROFIL:</h2>
          <ul>
            <li>Ilość zebranych punktów: {points}</li>
            <li>Poziom: WIP</li>
            <li>Ilość pozytywnie ukończonych quizów: WIP</li>
            <li>Ilość wszystkich wykonanych quizów: WIP</li>
          </ul>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = state => {
  return {
    fbauth: state.firebase.auth,
    points: state.firebase.profile.points,
    name: state.firebase.profile.name,
    surName: state.firebase.profile.surname
  }
}

const mapDispatchToProps = dispatch => {
  return {
      deleteAcc: () => dispatch(deleteAcc())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);