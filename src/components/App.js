import React, { useEffect, useContext } from 'react';
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

import {FirebaseContext} from "./Firebase/FirebaseIndex"
import {ProvideAuth} from "./Firebase/ProvideAuth"

export default function App() {

  const {fbauth} = useContext(FirebaseContext);
  const [ ,setAuthUser] = useContext(ProvideAuth);

  useEffect(() => {
    fbauth.onAuthStateChanged(user => {
      if (user) {
          setAuthUser(user);
      } else {
          setAuthUser(null);
      }
    });
  }, [fbauth, setAuthUser])

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/articles" component={Articles} />
        <Route exact path="/forum" component={Forum} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </Router>
  )
}
