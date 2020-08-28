import React, {useEffect} from 'react';
import{
    useHistory
} from "react-router-dom";
import {connect} from 'react-redux';

import Navigation from '../Navigation/Navigation';
import Footer from '../Navigation/Footer';

import Loader from 'react-loader-spinner';

function QuizResults({fbauth, correctAnswers, answersAmount, quizPassed}){
    
    const history = useHistory();

    useEffect(()=> {
        if(!fbauth.uid){
            history.push('/')
        }
    }, [history, fbauth.uid, correctAnswers]);

    return (
        <>
        <Navigation/>
        <div className="quiz_results_container">
            {(correctAnswers !== null) && answersAmount
            ?
                <>
                    <h1 className="quiz_results_title">WYNIKI</h1>
                    <h1 
                        className="quiz_results_result"
                        style={quizPassed ? {color: 'limegreen'} : {color: '#ff3a3a'}}
                    >Rezultat quizu: {quizPassed ? "Pozytywny" : "Negatywny"}</h1>
                    <h1 className="quiz_results_score">Ilość poprawnych odpowiedzi: {correctAnswers}/{answersAmount}</h1>
                    {quizPassed 
                    ? 
                        <h1 className="quiz_results_point">Zyskałeś/aś punkty!</h1>
                    :
                        null
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
        correctAnswers: state.quizReducer.correctAnswers,
        answersAmount: state.quizReducer.answersAmount,
        quizPassed: state.quizReducer.quizPassed,
        fbauth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(QuizResults)

