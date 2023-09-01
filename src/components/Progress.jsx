import React from 'react'

const Progress = ({ index, numQuestion, points, answer, maxPossiblePoints }) => {
  return (
    <header className='progress'>
        <progress max={numQuestion} value={index + Number(answer !== null)} />
    
        <p>Question <strong>{index + 1}</strong> / {numQuestion}</p>
        <p><strong>{points}</strong> / {maxPossiblePoints} points</p>
    </header>
  )
}

export default Progress