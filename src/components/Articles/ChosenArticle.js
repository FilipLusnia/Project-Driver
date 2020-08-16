import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firestoreConnect} from 'react-redux-firebase';

import Navigation from '../Navigation/Navigation';


function ChosenArticle(props) {

  const {fbauth} = props;
  const articleName = props.match.params.articlename;


  return (
    <>
      <Navigation/>
      <div>  
          {articleName}
      </div>
    </>
  )
}

const mapStateToProps = state => {
  return {
    fbauth: state.firebase.auth,
    articles: state.firestore.ordered.articles
  }
}
  
export default compose(
  connect(mapStateToProps),
  firestoreConnect([{
    collection: 'articles'
  }])
)(ChosenArticle)