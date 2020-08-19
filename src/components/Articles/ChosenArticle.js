import React, {useState} from 'react';
import {
  Link,
  useHistory
} from "react-router-dom";
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firestoreConnect} from 'react-redux-firebase';

import Navigation from '../Navigation/Navigation';
import Footer from '../Navigation/Footer';
import {sendComment} from '../Redux/Actions/forumActions';

import Loader from 'react-loader-spinner';


function ChosenArticle(props) {

  const {articles, fbauth} = props;
  const articleName = props.match.params.articlename;
  const currentArticle = articles?.[articleName];

  const [commentText, setCommentText] = useState(true);

  const history = useHistory();

  const handleChange = e => {
    setCommentText(e.target.value);
  }

  const handleClick = e => {
    e.preventDefault();

    if(commentText.length > 0 && props.userName){
      props.sendComment(commentText, props.userName);
    }
    history.push('/forum')
  }

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

                <p className="chosen_article_bottomtext">_________________________________________________</p>
                <form className="chosen_article_form">
                  <label className="chosen_article_form_label">
                    Masz pytanie? Zadaj je na forum:
                    <textarea onChange={handleChange} type="text" name="name" className="chosen_article_form_textarea"/>
                  </label>
                  <input onClick={handleClick} type="submit" value="Wyślij" className="chosen_article_form_btn"/>
                </form>
              </>
            :
              <>
                <p className="chosen_article_bottomtext">Aby wykonać quiz sprawdzający wiedzę z artykułu lub zadać pytanie na forum - musisz się zalogować:</p>
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
      <Footer/>
    </>
  )
}

const mapStateToProps = state => {
  return {
    fbauth: state.firebase.auth,
    articles: state.firestore.data.articles,
    userName: state.firebase.profile.name,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sendComment: (text, name) => dispatch(sendComment(text, name))
  }
}
  
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{
    collection: 'articles'
  }])
)(ChosenArticle)