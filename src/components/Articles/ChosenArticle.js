import React from 'react';
import {
  Link
} from "react-router-dom";
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firestoreConnect} from 'react-redux-firebase';

import Navigation from '../Navigation/Navigation';

import Loader from 'react-loader-spinner';


function ChosenArticle(props) {

  const {articles, fbauth} = props;
  const articleName = props.match.params.articlename;
  const currentArticle = articles?.[articleName];

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
            <p className="chosen_article_text">{currentArticle.text}</p>

            {fbauth.uid ? 
            <>
              <p className="chosen_article_bottomtext">Sprawdź czy pamiętasz przeczytany artykuł i wykonaj quiz:</p>
              <Link to={`/quiz/${articleName}`} className="chosen_article_quizbtn">Wykonaj quiz</Link>
            </>
            :
            <>
              <p className="chosen_article_bottomtext">Aby wykonać quiz sprawdzający wiedzę z artykułu - musisz się zalogować:</p>
              <Link to="/login" className="chosen_article_loginbtn">Zaloguj się</Link>
            </>
            }   
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