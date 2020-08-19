import React from 'react';
import {
  useHistory
} from "react-router-dom";
import {connect} from 'react-redux';

function ArticleList({thumbText, title, cover, id}) {

  const history = useHistory();

  const handleClick = e => {
    e.preventDefault();
    history.push(`/articles/${id}`)
  }

  return (
    <div className="article_item_container" onClick={handleClick}>
        <img src={cover} alt="cover" className="article_item_img"></img>
        <h2 className="article_item_title">{title}</h2>
        <p className="article_item_thumbtext">{thumbText}</p>
    </div>
  )
}

export default connect(null)(ArticleList)