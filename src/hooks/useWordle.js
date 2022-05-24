import { useState } from 'react'

const useWordle = ( solution ) => {
    const [turn,setTurn] = useState(0)
    const [currentGuess, setCurrentGuess ] = useState('')
    const [guesses, setGuesses ] = useState([...Array(6)])  //each guess is array
    const [history, setHistory ] = useState([]) // each guess is string
    const [isCorrect, setIsCorrect] = useState(false)
    const [usedKeys, setUsedKeys] = useState({}) // { a: 'green' , b:'yellow', c: 'grey'}


    // format a guess into an array of letter objects
    // e.g. [{key: 'a' , color: 'yellow'}]
    const formatGuess = () => {
        let solutionArray = [...solution]
        let formattedGuess = [...currentGuess].map((x) => {
            return {
                key: x,
                color: 'grey'
            }
        })
        
        //find any green letters
        formattedGuess.forEach((x,i)=>{
            if( solutionArray[i] === x.key ){
                formattedGuess[i].color = 'green'
                solutionArray[i] = null
            }
        })

        //find any yellow colors
        formattedGuess.forEach((x,i)=>{
            if(solutionArray.includes(x.key)  && x.color !== 'green'){
                formattedGuess[i].color = 'yellow'
                solutionArray[solutionArray.indexOf(x.key)] == null
            }
        })

        return formattedGuess
    }

    const addNewGuess = (formattedGuess) => {
        if(currentGuess === solution){
            setIsCorrect(true)
        }
        setGuesses((prevGuess)=>{
            let newguess = [...prevGuess]
            newguess[turn] = formattedGuess
            return newguess
        })
        setHistory((prevHistory)=>{
            return [...prevHistory, currentGuess]
        })
        setTurn((prevTurn)=>{
            return prevTurn + 1
        })
        setUsedKeys((prevUsed)=>{
            let newkeys = {...prevUsed}
            formattedGuess.forEach((l)=>{
                const currentColor = newkeys[l.key]
                if(l.color === 'green') {
                    newkeys[l.key] = 'green'
                    return
                }
                if(l.color === 'yellow' && currentColor !== 'green' ){
                    newkeys[l.key] = 'yellow'
                    return
                }
                if(l.color ==='grey' && currentColor !== 'yellow' && currentColor !== 'green'){
                    newkeys[l.key] = 'grey'
                    return
                }
            })
            return newkeys
        })
        setCurrentGuess('')
    }

    const handleKeyUp = (e) => {
        if(e.key === 'Enter'){
            if(turn <= 5){           //only if turn < 5
                if( !history.includes(currentGuess)){    // do not allow duplicate words
                    if(currentGuess.length == 5){   // 5 charsw have been entered
                        const formatted = formatGuess()
                        addNewGuess(formatted)
                    }else{
                        console.log("Word needs to be atleast 5 characters")
                    }
                }else{
                    console.log("You already guessed that word")
                }
            }else{
                console.log("You used all your guesses")
            }
        }
        if(e.key === 'Backspace'){
            setCurrentGuess((prevGuess)=>{
                return prevGuess.slice(0, -1)
            })

            return
        }
        if( /^[A-Za-z]$/.test(e.key)){
            if(currentGuess.length < 5)
            setCurrentGuess((prevGuess) => {
                return prevGuess + e.key
            })
        }
    }

    return { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyUp }
}

export default useWordle