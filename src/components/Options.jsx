import React from 'react'

const Options = ({ question, dispatch, answer }) => {
  const hasAnswered = answer !== null;

  return (
    <div className='options'>
        {question.options.map((opt, index) => (
            <button
                key={index}
                className={`btn btn-option ${index === answer ? 'answer' : ''} ${hasAnswered ? index === question.correctOption ? 'correct' : 'wrong' : ''}`}
                onClick={() => dispatch({
                    type: 'newAnswer',
                    payload: index
                })}
                disabled={hasAnswered}
            >
                {opt}
            </button>
        ))}
    </div>
  )
}

export default Options