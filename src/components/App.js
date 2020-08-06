import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from './Home/Home';
import Articles from './Articles/Articles';
import Forum from './Forum/Forum';
import Login from './Login';
import Register from './Register';
import Profile from './Profile/Profile';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/articles" component={Articles} />
        <Route exact path="/forum" component={Forum} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/profile" component={Profile} />
      </Switch>
    </Router>
  )
}
