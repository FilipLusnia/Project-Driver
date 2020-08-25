import React, { useEffect } from 'react';
import {
  useHistory
} from "react-router-dom";
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firestoreConnect} from 'react-redux-firebase';

import Navigation from '../Navigation/Navigation';
import Footer from '../Navigation/Footer';

function Quiz(props) {
  
  const history = useHistory();
  const articleData = props.articleData ? props.articleData[0] : null;

  useEffect(()=> {
    if(!props.fbauth.uid){
        history.push('/')
    }
  }, [history, props.fbauth.uid]);

  return (
    <>
      <Navigation/>
      <div className="quiz_container"> 
        <h1>{articleData?.title}</h1>
        <h2>Quiz</h2>
      </div>
      <Footer/>
    </>
  )
}

const mapStateToProps = state => {
    return {
      fbauth: state.firebase.auth,
      articleData: state.firestore.ordered.articles
    }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props=>[{
    collection: 'articles',
    doc: props.match.params.articlename
  }])
)(Quiz)
