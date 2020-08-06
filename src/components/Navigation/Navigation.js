import React from 'react';
import { connect } from 'react-redux';

import LoggedInNavigation from './LoggedInNavigation';
import LoggedOutNavigation from './LoggedOutNavigation';

function Navigation(props) {
  const {fbauth} = props;

  return (
    fbauth.uid ? <LoggedInNavigation/> : <LoggedOutNavigation/>
  )
}

const mapStateToProps = state => {
  return {
    fbauth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(Navigation)
