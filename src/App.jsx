import { useCallback, useEffect, useState,useRef } from 'react'
import './App.css'
import Keyboard from './Keyboard.jsx'
import Board from './board.jsx'
import Modal from './Modal.jsx'

const merge = (letters, word) => {
  return Array.from(new Set(letters + word)).join("");
}
function App() {

  const api_url = "https://api.datamuse.com/words?sp=?????&max=1000"
  const rows = 6
  const [ansWord , setAnsWord]=useState('')
  const [guesses , setGuesses]=useState(new Array(rows).fill(''))
  const [currentWord , setCurrentWord]=useState('')
  const [currentRow , setCurrentRow]=useState(0)
  const [letters, setLetters] = useState("");
  const [gameStatus, setGameStatus] = useState("");
  const [hints, setHints] = useState([]);

  const ref = useRef();

  //fetch word from api
  const fetchData =  async ()=>{
    try {
      const res = await fetch(api_url)
      const data = await res.json()
      // converting array of objets into array of key.value
      const letterArr= data.map(obj => obj.word)
      const rendomWord = letterArr[Math.floor(Math.random()*letterArr.length)]
      setAnsWord(rendomWord.toUpperCase())
      const randomHints = [];
      while (randomHints.length < 20) {
        const hintWord = letterArr[Math.floor(Math.random() * letterArr.length)];
        if (!randomHints.includes(hintWord) && hintWord !== rendomWord) {
          randomHints.push(hintWord.toUpperCase());
        }
      }
  
      // Add the correct answer to the hints and shuffle them
      const allHints = [...randomHints, rendomWord.toUpperCase()].sort(() => Math.random() - 0.5);
      setHints(allHints);
    } catch (error) {
      console.error("Error fetcing data" , error);
    }
  }
  useEffect( () => {
    fetchData()
  } , [])
 
//track the key when user typed and insret in the guesses array
  const hendelKeyEvent = useCallback((e) => {
    const {keyCode , key} = e

    if (keyCode === 8 && currentWord.length) {
      setCurrentWord((currentWord) => (currentWord.slice(0,-1)))
      return
    };
    if (currentWord.length===5) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
      if (keyCode !== 13) {
        return
      } else {
        setGuesses(guesses => guesses.map((letter , idx) =>
         (idx === currentRow ? currentWord : letter)
        ))

        setCurrentRow(currentRow => currentRow+1)
        setLetters((letters) => merge(letters, currentWord));
        setCurrentWord('')
        return
      }
    }
    if (keyCode>=65 && keyCode<=90) {
      setCurrentWord((currentWord) => (currentWord + key.toUpperCase()))
      return
    }
  },[currentRow,currentWord])
  useEffect(() => {
    document.addEventListener('keydown',hendelKeyEvent)
  
    return () => {
      document.removeEventListener('keydown',hendelKeyEvent)
    }
  }, [hendelKeyEvent])

 useEffect(() => {
    if (guesses[currentRow - 1] === ansWord && ansWord) {
      setGameStatus("You Won!");
      ref.current.openModal();
    } else if (currentRow > 5) {
      setGameStatus("You Lost!");
      ref.current.openModal();
    }
  }, [currentRow, guesses, ansWord]);

  const handleGameReset = () => {
    fetchData()
    setGuesses(new Array(rows).fill(""));
    setCurrentRow(0);
    setCurrentWord("");
    setLetters("");
    setGameStatus("");
  };  
  

  return (
    <>
      <h1>WORDLE GAME</h1>
      <div className="hints">
        <h2>Hints:</h2>
        <ul className="hintWords">
          {hints.map((hint, index) => (
            <li key={index}>{hint}</li>
          ))}
        </ul>
      </div>
      <Board 
        guesses={guesses} 
        currentRow={currentRow} 
        currentWord={currentWord} 
        ansWord={ansWord}
      />
      <Keyboard letters={letters} ansWord={ansWord} guesses={guesses} />
      <Modal
        gameStatus={gameStatus}
        ref={ref}
        ansWord={ansWord}
        handleGameReset={handleGameReset}
      />
     
    </>
  )
}

export default App
