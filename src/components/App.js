import React, {useEffect} from 'react';
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ScrollToTop from './ScrollToTop';
import {connect} from 'react-redux';

import Home from './Home/Home';
import ArticleList from './Articles/ArticleList';
import ChosenArticle from './Articles/ChosenArticle';
import Quiz from './Quiz/Quiz';
import QuizResults from './Quiz/QuizResults';
import Forum from './Forum/Forum';
import Login from './Login';
import Register from './Register';
import Profile from './Profile/Profile';
import {updateLevel} from './Redux/Actions/levelActions';

function App(props){

  useEffect(() => {
    props.updateLevel()
  }, [props.points, props])

  return (
    <Router>
      <ScrollToTop>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/articles" component={ArticleList} />
          <Route exact path="/articles/:articlename" component={ChosenArticle} />
          <Route exact path="/quiz/:articlename" component={Quiz} />
          <Route exact path="/quiz/results/:articlename" component={QuizResults} />
          <Route exact path="/forum" component={Forum} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
      </ScrollToTop>
    </Router>
  )
}

const mapStateToProps = state => {
  return {
    points: state.firebase.profile.points
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateLevel: () => dispatch(updateLevel())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)