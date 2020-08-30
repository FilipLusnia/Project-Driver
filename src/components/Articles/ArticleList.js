import React from 'react';

import {connect} from 'react-redux';
import {compose} from 'redux';
import {firestoreConnect} from 'react-redux-firebase';

import Navigation from '../Navigation/Navigation';
import ArticleItem from './ArticleItem';
import Footer from '../Navigation/Footer';

import Loader from 'react-loader-spinner';


function ArticleList({articles}) {

  return (
    <>
      <Navigation/>
      <div className="article_list_container">
        <h1 className="article_list_title">
          Witaj w naszej bazie wiedzy motoryzacyjnej!<br/>Czytaj artykuły i sprawdź czy coś z nich wyniosłeś/aś,
          wykonując quiz na końcu każdego tekstu.
        </h1>
        {
        (articles?.length > 1) ?
          <ul className="article_list">
            {articles.map(item => (
              <ArticleItem 
                thumbText={item.thumbText} 
                title={item.title} 
                cover={item.img}
                id={item.id}
                key={item.id}
              />
            ))}    
          </ul> 

        :

          <div className="article_list_loader">
            <Loader type="Circles" color="#5365ff" height={80}/>
          </div>
        }
      </div>
      <Footer/>
    </>
  )
}

const mapStateToProps = state => {
  return {
    articles: state.firestore.ordered.articles
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{
    collection: 'articles'
  }])
)(ArticleList)