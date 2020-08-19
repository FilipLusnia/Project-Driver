import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firestoreConnect} from 'react-redux-firebase';

import Navigation from '../Navigation/Navigation';
import Comment from './Comment';

import Loader from 'react-loader-spinner';

function Forum(props) {

  return (
    <>
      <Navigation/>
      <div>
        <ul>
          {
            props.comments ?
              props.comments.map(comment => (
                <Comment
                  comment={comment.comment}
                  name={comment.name}
                  title={comment.title}
                  id={comment.id}
                  key={comment.id}
                />
              ))

            :

              <div className="forum_loader">
                <Loader type="Circles" color="#5365ff" height={80}/>
              </div>
          }
        </ul>
      </div>
    </>
  )
}

const mapStateToProps = state => {
  return{
    comments: state.firestore.ordered.comments
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{
    collection: 'comments'
  }])
)(Forum)