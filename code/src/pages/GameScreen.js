import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import "nes.css/css/nes.min.css"
import Loading from './Loading'
import Finish from './Finish'

import {questions, generateNextQuestion } from '../reducers/questions'

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`

const GameScreenMainDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5% 10% 15% 10%;
  text-align: center;
  background-size: cover;
  background-position: center;
  height: 450px;
  max-width: 1000px;
  margin: auto;
  margin-top: 100px;

  @media (min-width 668px) {
    max-width: 500px;
  }
`;

const OneMoveContainer = styled.div`
  border: 2px solid black;
  box-shadow: 5px 10px black;
  border-radius: 10px;
  background-color: rgb(177, 158, 116);
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding: 2%;
  max-width: 350px;
  margin: 0 auto;
`;

const QuestionsText = styled.h2`
  background-color: rgba(0, 0, 0, 0.5);
`;

const MovesText = styled.h3`
  background-color: rgba(0, 0, 0, 0.5);
  width: 450px;
  margin: auto;
  margin-bottom: 30px;
  margin-top: 0;
`;


const GameScreen = () => {
    const gameStatus = useSelector(store => store.questions.gameStatus)
    const actions = useSelector(store => store.questions.gameStatus.actions)
    const userName = useSelector(store => store.questions.userName)
    const loading = useSelector(store => store.questions.loading)
    const history= useSelector(store => store.questions.history)

    const dispatch = useDispatch()

    if (loading) {
      return (
        <Loading />
      ) 
    }
    const onGameStatusRevert = () => {
      dispatch(questions.actions.setPreviousGameStatus())
    }
    const RestartGame = () => {
      window.location.reload()
    }
    

   return (
     <>
       <GameScreenMainDiv>
          <Header>
             <button 
             class="nes-btn is-error"
             disabled={history.length}
             onClick={onGameStatusRevert}>Go Back</button>
             <QuestionsText>{gameStatus.description}</QuestionsText>
             <button
             class="nes-btn is-success"
             onClick={RestartGame}>Restart Game</button>
          </Header>
    
			 <MovesText>Your options are:</MovesText>

        {gameStatus.actions.map(action => (
         <OneMoveContainer>
            <p>{actions.description}</p>
						<button class="nes-btn is-primary"
						key={userName}
						onClick={() => dispatch(generateNextQuestion(userName, action.direction))}
						>{action.direction}</button>
         </OneMoveContainer>

           ))}
       </GameScreenMainDiv>
       
       <Finish />
       </>
   )
}
export default GameScreen
