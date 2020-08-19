import React, { useState } from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firestoreConnect} from 'react-redux-firebase';
import {sendReply} from '../Redux/Actions/forumActions';

import Loader from 'react-loader-spinner';
import moment from 'moment';

function Reply(props) {

  const [replyText, setReplyText] = useState();

  const handleChange = e => {
    setReplyText(e.target.value);
  }

  const handleClick = e => {
    e.preventDefault();

    if(replyText.length > 0 && props.userName && props.commentId){
      props.sendReply(replyText, props.userName, props.commentId);
    }
  }

  props.forumError && console.log(props.forumError)

  return (
    <>
      <ul>
        {props.commentReplies ?
          (props.commentReplies.length > 0) ?

          props.commentReplies.map(e => (
              <li 
                key={e.id}
                className="forum_reply"
              >
                <p>{e.name}</p>
                <p>{e.reply}</p>
                <p>{moment(e.date.toDate()).calendar()}</p>
              </li>
            ))
            

          :
            <p>Nikt jeszcze nie odpowiedział na ten post. Bądź pierwszy!</p>

        :
          <Loader type="Circles" color="#5365ff" height={30}/>
        }
      </ul>

      {props.fbauth.uid ?
        <form>
          <label>
            Odpowiedz:
            <textarea onChange={handleChange} type="text" name="name" />
          </label>
          <input onClick={handleClick} type="submit" value="Wyślij" />
        </form>
      :
        <p>Aby móc odpowiadać na posty - musisz się zalogować.</p>
      }
    </>
  )
}

const mapStateToProps = (state, props) => {
  return{
    commentReplies: state.firestore.ordered[`replies-${props.id}`],
    userName: state.firebase.profile.name,
    commentId: props.id,
    forumError: state.forumReducer.forumError,
    fbauth: state.firebase.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sendReply: (text, name, commId) => dispatch(sendReply(text, name, commId))

  }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props =>[{
      collection: 'comments',
      doc: props.id,
      subcollections: [{collection: 'replies'}],
      storeAs: `replies-${props.id}`,
      orderBy: ['date', 'asc']
    }])
)(Reply)