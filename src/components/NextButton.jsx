import React from 'react'

const NextButton = ({ dispatch, answer, index, numQuestion }) => {
  if(answer === null) return null;
  
    if(index < numQuestion - 1) {
        return (
            <button
                className='btn btn-ui'
                onClick={() => dispatch({
                    type: 'nextQuestion'
                })}
            >
                Next
            </button>
        )
    } else {
        return (
        <div
            className='btn btn-ui'
            onClick={() => dispatch({
                type: 'finish'
            })}
        >
            Finish
        </div>
        )
    }
}

export default NextButton