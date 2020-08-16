import React, { useEffect } from 'react';
import {
  useHistory
} from "react-router-dom";
import {connect} from 'react-redux';

function Quiz({fbauth}) {
  
  const history = useHistory();

  useEffect(()=> {
    if(!fbauth.uid){
        history.push('/')
    }
  }, [history, fbauth.uid]);

  return (
    <div> 
        quiz
    </div>
  )
}

const mapStateToProps = state => {
    return {
      fbauth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(Quiz)