import './App.css'
import { useEffect, useState } from 'react'
import words from './wordlist.js';

function App() {
  const [word, setWord] = useState(words[Math.floor(Math.random() * words.length)]);
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState('');

  useEffect(() => {
    function handleTpye(event) {
      setCurrentGuess(currentGuess => currentGuess + event.key);
    }
    window.addEventListener('keydown', handleTpye);

    // return () => window.removeEventListener('keydown', handleTpye)
  }, [])

  return (<>
    <div className='board'>
      {
        guesses.map(guess => {
          return (
            <Line guess={guess ?? ''}/>
          )
        })
      }
      {currentGuess}
    </div>
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

