import React from 'react';
import {
  useHistory
} from "react-router-dom";
import {connect} from 'react-redux';

import Loader from 'react-loader-spinner';


function ArticleList({thumbText, title, cover, id}) {

  const history = useHistory();

  const handleClick = e => {
    e.preventDefault();
    history.push(`/articles/${id}`)
  }

  return (
      <li className="article_item_container" onClick={handleClick}>
        {cover 
        ?
          <>
            <img src={cover} alt="cover" className="article_item_img"/>
            <h2 className="article_item_title">{title}</h2>
            <p className="article_item_thumbtext">{thumbText}</p>
          </>
        :
          <div className="article_item_loader">
            <Loader type="Circles" color="#5365ff" height={80}/>
          </div>
        }
      </li>
  )
}

export default connect(null)(ArticleList)