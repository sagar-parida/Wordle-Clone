import React, { useState } from 'react'
import { useEffect } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid'
import Keypad from './keypad'
import Modal from './Modal'

const Wordle = ({solution}) => {

    const {currentGuess, handleKeyUp, guesses, isCorrect, turn, usedKeys } = useWordle(solution)
    const [ showModal, setShowModal ] = useState(false)
    useEffect(()=>{
        window.addEventListener('keyup',handleKeyUp)

        if (isCorrect){
          setTimeout(()=>{
            setShowModal(true)
          },1500)
          window.removeEventListener('keyup',handleKeyUp)
        }

        if(turn > 5){
          setTimeout(()=>{
            setShowModal(true)
          },1500)
          window.removeEventListener('keyup',handleKeyUp)
        }
        return () => window.removeEventListener('keyup',handleKeyUp)
    },[handleKeyUp, isCorrect, turn])

  return (
    <div>
      Current Guess: {currentGuess}
      <Grid currentGuess={currentGuess} turn={turn} guesses={guesses} />
      <Keypad usedKeys={usedKeys}/>
      {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution}/>}
    </div>
  )
}

export default Wordle
