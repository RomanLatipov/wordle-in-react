import './App.css'
import { useEffect, useState } from 'react'
import words from './wordlist.js';

function App() {
  const [word, setWord] = useState(words[Math.floor(Math.random() * words.length)]);
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [isFinal, setIsFinal] = useState(false);

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
          console.log("Game over");
        }
        const idx = guesses.indexOf(null);
        // console.log(idx); when idx == -1 end the game
        guesses[idx] = currentGuess;
        setCurrentGuess('');
        setIsFinal(true);
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
    </div>
    {currentGuess}
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

    // console.log(isFinal)
    tiles.push(<div key={i} className={className}>{char}</div>)
    // style={isFinal && isClose ? {background: 'green'} : isFinal && isIncluded ? {background: 'yellow'} : {background: 'grey'}}
  }
  return <div className='line'>{tiles}</div>
}
//
export default App

