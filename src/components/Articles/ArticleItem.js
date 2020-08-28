import React, {useState} from 'react';
import {
  useHistory
} from "react-router-dom";
import {connect} from 'react-redux';

import firebase from 'firebase/app';
import 'firebase/storage';

import Loader from 'react-loader-spinner';


function ArticleList({thumbText, title, cover, id}) {

  const history = useHistory();
  const storage = firebase.storage();

  const [url, setUrl] = useState(null);

  const handleClick = e => {
    e.preventDefault();
    history.push(`/articles/${id}`)
  }

  storage.ref(`article-photos/${cover}`).getDownloadURL()
  .then(url => setUrl(url))

  return (
      <div className="article_item_container" onClick={handleClick}>
        {url 
        ?
          <>
            <img src={url} alt="cover" className="article_item_img"/>
            <h2 className="article_item_title">{title}</h2>
            <p className="article_item_thumbtext">{thumbText}</p>
          </>
        :
          <div className="article_item_loader">
            <Loader type="Circles" color="#5365ff" height={80}/>
          </div>
        }
      </div>
  )
}

export default connect(null)(ArticleList)