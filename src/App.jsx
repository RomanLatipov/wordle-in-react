import './App.css'
import { useEffect, useState } from 'react'
import words from './wordlist.js';

function App() {
  const [word, setWord] = useState(words[Math.floor(Math.random() * words.length)]);
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState('');

  useEffect(() => {
    function handleTpye(event) {
      if (event.key === 'Enter') {
        if(currentGuess.length !== 5) {
          return;
        }
        else {
          const idx = guesses.indexOf(null);
          // console.log(idx); when idx == -1 end the game
          guesses[idx] = currentGuess;
          setCurrentGuess('');
        }
      }
      else if (event.key === 'Backspace') {
        setCurrentGuess(oldGuess => oldGuess.substring(0, oldGuess.length-1));
      }
      else if (currentGuess.length < 5) {
        setCurrentGuess(oldGuess => oldGuess + event.key);
      }
      // setCurrentGuess(currentGuess => currentGuess + event.key);
    }
    window.addEventListener('keydown', handleTpye);

    return () => window.removeEventListener('keydown', handleTpye);
  }, [currentGuess])

  return (<>
    <div className='board'>
      {
        guesses.map((guess, i) => {
          const idx = guesses.indexOf(null);
          return (
            <Line guess={i == idx ? currentGuess : guess ?? ''}/>
          )
        })
      }
    </div>
    {currentGuess}
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

