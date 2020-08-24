import React, { useState } from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firestoreConnect} from 'react-redux-firebase';

import Navigation from '../Navigation/Navigation';
import Footer from '../Navigation/Footer';
import Comment from './Comment';
import {sendComment} from '../Redux/Actions/forumActions';

function Forum(props) {

  const [commentText, setCommentText] = useState();

  const handleChange = e => {
    setCommentText(e.target.value);
  }

  const handleClick = e => {
    e.preventDefault();

    const creds = {
      userName: props.userName, 
      userSurname: props.userSurname
    }

    if(commentText.length > 0 && props.userName && props.userSurname){
      props.sendComment(commentText, creds);
    }
  }

  props.forumError && console.log(props.forumError)

  return (
    <>
      <Navigation/>
      <div className="forum_container">
        {props.fbauth.uid ?
          <form className="forum_form">
            <label className="forum_form_label">
              Dodaj post:
              <textarea onChange={handleChange} type="text" name="name" className="forum_form_textarea" />
            </label>
            <input onClick={handleClick} type="submit" value="Dodaj" className="forum_form_submit" />
          </form>
        :
          <p className="forum_form_info">Aby móc dodawać posty - musisz się zalogować.</p>
        }
        {(props.comments?.length > 0) ?
          <ul className="forum_posts_container">
            {
              props.comments.map(comment => (
                <li>
                  <Comment
                    comment={comment.comment}
                    name={comment.name}
                    surname={comment.surname}
                    date={comment.date}
                    id={comment.id}
                    key={comment.id}
                  />
                </li>
              ))
            }
          </ul>
        :
          <p className="nocomments_info"> Na forum nie ma jeszcze żadnych postów.</p>
        }
      </div>
      <Footer/>
    </>
  )
}

const mapStateToProps = state => {
  return{
    comments: state.firestore.ordered.comments,
    userName: state.firebase.profile.name,
    userSurname: state.firebase.profile.surname,
    forumError: state.forumReducer.forumError,
    fbauth: state.firebase.auth
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
    collection: 'comments',
    orderBy: ['date', 'desc']
  }])
)(Forum)