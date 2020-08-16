import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firestoreConnect} from 'react-redux-firebase';

import Navigation from '../Navigation/Navigation';

import Loader from 'react-loader-spinner';


function ChosenArticle(props) {

  window.scrollTo(0, 0);
  
  const {articles} = props;
  const articleName = props.match.params.articlename;
  const currentArticle = articles?.[articleName]

  return (
    <>
    <Navigation/>
      <div>
        {
        currentArticle ?
          <div className="chosen_article_container">
            <h1 className="chosen_article_title">{currentArticle.title}</h1>
            <h2 className="chosen_article_thumbtext">{currentArticle.thumbText}</h2>
            <img src={currentArticle.img} alt="cover" className="chosen_article_img"></img>
            <h className="chosen_article_text">{currentArticle.text}</h>
          </div>
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