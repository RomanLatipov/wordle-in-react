import './App.css'
import { useEffect, useState } from 'react'
import words from './wordlist.js';

function App() {
  const [word, setWord] = useState(words[Math.floor(Math.random() * words.length)]);
  const [guesses, setGuesses] = useState(Array(6).fill(null));

  return (<>
    {
      guesses.map(guess => {
        return (
          <Line guess={guess ?? ''}/>
        )
      })
    }
  </>)
}
function Line({guess}) {
  const tiles = [];
  for (let i=0; i<5; i++) {
    const char = guess[i];
    tiles.push(<div key={i} className='tiles'>{char}</div>)
  }

  return <div className='line'>{tiles}</div>
}

export default App

