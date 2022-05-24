import React from 'react'
import { useEffect, useState } from 'react'
import Wordle from './components/Wordle'
const App = () => {
    
    const [solution, setSolution ] = useState(null)

    useEffect(() => {
        fetch('http://localhost:3001/solutions')
            .then(res => res.json())
            .then(json => {
                const randomSolution = json[Math.floor(Math.random()*json.length)]
                setSolution(randomSolution.word)

            })
    },[setSolution])

    return (
        <div className="App">
        <h1>Wordle (Lingo)</h1>
        <h2>Current Word: {solution}</h2>
        {solution && <Wordle solution={solution} />}
        </div>
    )
}



//json-server ./data/db.json --port 3001
export default App
