import './App.css'
import { useEffect, useState } from 'react'
import words from './wordlist.js';

function App() {
  const [word, setWord] = useState(words[Math.floor(Math.random() * words.length)]);
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    function handleTpye(event) {
      if (gameOver) {
        return;
      }
      if (event.key === 'Enter') {
        if(currentGuess.length !== 5) {
          return;
        }
        else if (word === currentGuess) {
          setGameOver(true);
          window.removeEventListener('keydown', handleTpye);
        }
        const idx = guesses.indexOf(null);
        console.log(idx);
        // if (idx === 5)
        //   setGameOver(true);
        guesses[idx] = currentGuess;
        setCurrentGuess('');
      }
      else if (event.key === 'Backspace') {
        setCurrentGuess(oldGuess => oldGuess.substring(0, oldGuess.length-1));
      }
      else if (currentGuess.length < 5) {
        const isLetter = event.key.match(/^[a-z]{1}$/)
        if (isLetter)
          setCurrentGuess(oldGuess => oldGuess + event.key);
      }
    }
    window.addEventListener('keydown', handleTpye);

    return () => window.removeEventListener('keydown', handleTpye);
  }, [currentGuess])
  
  function test() {
    if(gameOver && guesses.indexOf(null) === -1)
      alert("Game over")
  }

  return (<>
    {word}
    <div className='board'>
      {
        guesses.map((guess, i) => {
          const idx = guesses.indexOf(null);
          return (
            <Line guess={i == idx ? currentGuess : guess ?? ''} word={word} isFinal={guess ? true : false}/>
          )
        })
      }
      {/* {gameOver ? test() : ""} */}
    </div>
  </>)
}
function Line({guess, word, isFinal}) {
  const tiles = [];
  for (let i=0; i<5; i++) {
    const char = guess[i];    
    let className = 'tiles';
    if (isFinal) {
      if (word[i] === char)
        className = 'correct';
      else if (word.includes(char))
        className = 'close';
      else
        className = 'wrong';
    }
    tiles.push(<div key={i} className={className}>{char}</div>)
  }
  return <div className='line'>{tiles}</div>
}
export default App

