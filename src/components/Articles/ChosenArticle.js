import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firestoreConnect} from 'react-redux-firebase';

import Navigation from '../Navigation/Navigation';

import Loader from 'react-loader-spinner';


function ChosenArticle(props) {
  
  const {fbauth, articles} = props;
  const articleName = props.match.params.articlename;
  const currentArticle = articles?.[articleName]

  return (
    <>
    <Navigation/>
      <div>
        {
        currentArticle ?
          <p>{currentArticle.title}</p>
          
        :

          <div className="article_list_loader">
            <Loader type="Circles" color="#5365ff" height={80}/>
          </div>
        }
      </div>
    </>
  )
}

const mapStateToProps = state => {
  return {
    fbauth: state.firebase.auth,
    articles: state.firestore.data.articles
  }
}
  
export default compose(
  connect(mapStateToProps),
  firestoreConnect([{
    collection: 'articles'
  }])
)(ChosenArticle)