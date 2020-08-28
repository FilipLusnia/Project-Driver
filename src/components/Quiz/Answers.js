import React, { useState, useEffect } from 'react';

export default function Answers({answers, correctAnswer, getAnswers, question}) {

    const answersData = Object.values(answers);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    useEffect(()=>{
        getAnswers(question, selectedAnswer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleClick = e => {
        setSelectedAnswer(e.target.value);

        if(e.target.value === correctAnswer){
            getAnswers(question, 1);
        } else {
            getAnswers(question, 0);
        }
    }

    return (
        <ul>
        {
            answersData.map(answer => (
                <li className="quiz_answer_container" key={answer}>
                    <label className="quiz_answer">
                        {answer}
                        <input 
                            type="radio"
                            value={answer}
                            onChange={handleClick}
                            checked={selectedAnswer === answer}
                        />
                        <span className="quiz_answer_selector"/>
                    </label>
                </li>
            ))
        }
        </ul>
    )
}