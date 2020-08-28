import React, { useEffect, useState } from 'react';
import{
  useHistory
} from "react-router-dom";
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firestoreConnect} from 'react-redux-firebase';

import Navigation from '../Navigation/Navigation';
import Footer from '../Navigation/Footer';
import Questions from './Questions';
import {checkAnswers} from '../Redux/Actions/quizActions';

import Loader from 'react-loader-spinner';

function Quiz(props) {
  
  const history = useHistory();

  const articleData = props.articleData ? props.articleData[0] : null;
  const quizData = props.quizData ? props.quizData[0] : null;

  const [answers, setAnswers] = useState();
  
  useEffect(()=> {
    if(!props.fbauth.uid){
        history.push('/')
    }
  }, [history, props.fbauth.uid]);

  const getAnswers = (question, answer) => {
    setAnswers(prev => {return{...prev, [question]: answer}})
  }

  const handleSubmit = e => {
    e.preventDefault();

    const sumOfPoints = Object.values(answers).reduce((a, b) => a + b, 0);
    const sumOfQuestions = Object.values(quizData.questions).length;
    props.checkAnswers(sumOfPoints, sumOfQuestions)

    history.push(`/quiz/results/${articleData.id}`)
  }

  return (
    <>
      <Navigation/>
      <div className="quiz_container"> 
        {
          ((quizData !== (null && undefined)) && (articleData.id === props.match.params.articlename)) 
          ?
            <>
              <h1 className="quiz_name">{articleData.title}</h1>
              <div className="quiz_title_container">
                <h1>Wykonaj quiz i sprawdź swoją wiedzę z artykułu.</h1>
                <h1>Aby zaliczyć quiz, musisz poprawnie odpowiedzieć na każde z pytań.</h1>
              </div>
              <Questions quizData={quizData} getAnswers={getAnswers}/>
              
              {(answers && (!Object.values(answers).includes(null)))
              ?
                <button onClick={handleSubmit} className="quiz_submit_btn">Zatwierdź odpowiedzi</button>
              :
                <p className="quiz_warn">Zaznacz odpowiedź na każde pytanie!</p>
              }
            </>
          :
            <div className="quiz_loader">
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
    articleData: state.firestore.ordered.articles,
    quizData: state.firestore.ordered.quizes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkAnswers: (correctAnswers, answersAmount) => {
      dispatch(checkAnswers(correctAnswers, answersAmount))
    }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props=>[
  {
    collection: 'articles',
    doc: props.match.params.articlename
  },
  {
    collection: 'quizes',
    doc: props.match.params.articlename
  } 
  ])
)(Quiz)
