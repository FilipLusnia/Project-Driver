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

    if(commentText.length > 0 && props.userName){
      props.sendComment(commentText, props.userName);
    }
  }

  props.forumError && console.log(props.forumError)

  return (
    <>
      <Navigation/>
      <div className="forum_container">
        {props.fbauth.uid ?
          <form>
            <label>
              Dodaj post:
              <textarea onChange={handleChange} type="text" name="name" />
            </label>
            <input onClick={handleClick} type="submit" value="Wyślij" />
          </form>
        :
          <p>Aby móc dodawać posty - musisz się zalogować.</p>
        }

        <ul>
          {
            props.comments ?
              props.comments.map(comment => (
                <Comment
                  comment={comment.comment}
                  name={comment.name}
                  date={comment.date}
                  id={comment.id}
                  key={comment.id}
                />
              ))

            :

              <p> Na forum nie ma jeszcze żadnych postów.</p>
          }
        </ul>
      </div>
      <Footer/>
    </>
  )
}

const mapStateToProps = state => {
  return{
    comments: state.firestore.ordered.comments,
    userName: state.firebase.profile.name,
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