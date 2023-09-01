import React, { useEffect, useReducer } from 'react';

import Header from './components/Header';
import Loader from './components/Loader';
import Error from './components/Error';
import MainBox from './components/MainBox';
import StartScreen from './components/StartScreen';
import Questions from './components/Questions';
import NextButton from './components/NextButton';
import Progress from './components/Progress';
import FinishedScreen from './components/FinishedScreen';

const initialValue  = {
  questions: [],

  // loading, error, ready, active, finished;
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0
}

function reducer(state, action) {
  switch(action.type) {
    case 'dataReceived': 
      return {
        ...state,
        questions: action.payload,
        status: 'ready'
      }

    case 'dataFailed':
      return {
        ...state,
        status: 'error'
      }

    case 'start':
      return {
        ...state,
        status: 'active'
      }

    case 'newAnswer':
      const currQuestion = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === currQuestion.correctOption
            ? state.points + currQuestion.points
            : state.points
      }

    case 'nextQuestion':
      return {
        ...state,
        answer: null,
        index: state.index + 1
      }

    case 'finish':
      return {
        ...state,
        status: 'finished',
        highscore: state.points > state.highscore ? state.points : state.highscore
      }
    
    case 'restart':
      return {
        ...initialValue,
        questions: state.questions,
        status: 'ready'
      }

    default: 
      throw new Error('Action unknown!');
  }
}

const App = () => {
  const [state, dispatch]   = useReducer(reducer, initialValue);

  useEffect(() => {
    fetch('http://localhost:3000/questions')
      .then((res) => res.json())
      .then((data) => dispatch({
        type: 'dataReceived',
        payload: data
      }))
      .catch((error) => {
        dispatch({
          type: 'dataFailed'
        })
      })
  }, []);

  const { questions, status, index, answer, points, highscore }    = state;
  const maxPossiblePoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  return (
    <div className='app'>
      <Header />

      <MainBox>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && 
          <StartScreen
            numQuestion={questions.length}
            dispatch={dispatch} 
          />
        }

        {status === 'active' && 
          <>
            <Progress
              index={index}
              numQuestion={questions.length}
              points={points}
              answer={answer}
              maxPossiblePoints={maxPossiblePoints}
            />
            <Questions
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              index={index}
              numQuestion={questions.length}
            />
          </>
        }

        {status === 'finished' &&
          <FinishedScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        }

      </MainBox>
    </div>
  )
}

export default App