import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firestoreConnect} from 'react-redux-firebase';

function Reply({commentReplies}) {

  return (
    <ul>
      {commentReplies?.map(e => (
        <li 
          key={e.reply}
          className="forum_reply"
        >
          <p>{e.name}</p>
          <p>{e.reply}</p>
        </li>
      )).reverse()}
    </ul>
  )
}

const mapStateToProps = (state, props) => {
  return{
    commentReplies: state.firestore.ordered[`replies-${props.id}`]
  }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(props =>[{
      collection: 'comments',
      doc: props.id,
      subcollections: [{collection: 'replies'}],
      storeAs: `replies-${props.id}`
    }])
)(Reply)