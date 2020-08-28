import React from 'react';

import Answers from './Answers';

export default function Questions(props) {

    const questionData = Object.values(props.quizData.questions);

    return (
        <ul>
        {questionData.map(question => (
            <li key={question.question}>
                <p className="quiz_question">{question.question}</p>
                <Answers 
                    question={question.question}
                    answers={question.answers} 
                    correctAnswer={question.correct_answer}
                    getAnswers={props.getAnswers}
                />
            </li>
        ))}
        </ul>
    )
}
  