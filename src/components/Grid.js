import React from 'react'
import Row from './Row'

const Grid = ({ currentGuess, guesses, turn }) => {
  return (
    <div>
      {guesses.map((guess,i) => {
          if( turn === i){
            return <Row key={i} guess={guess} currentGuess={currentGuess}/>
          }else{
            return <Row key={i} guess={guess}/>
          } 
      })}
    </div>
  )
}

export default Grid
