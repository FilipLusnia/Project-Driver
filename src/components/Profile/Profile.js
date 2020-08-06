import React, { useEffect } from 'react';
import {
  useHistory
} from "react-router-dom";
import Navigation from '../Navigation/Navigation';
import {connect} from 'react-redux';

function Profile(props) {
  
  const {fbauth} = props;
  const history = useHistory();

useEffect(()=> {
  if(!fbauth.uid){
    history.push('/')
  }
}, [history, fbauth.uid ]);

  return (
    <>
      <Navigation/>
      profile   
    </>
  )
}

const mapStateToProps = state => {
  return {
    fbauth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(Profile)