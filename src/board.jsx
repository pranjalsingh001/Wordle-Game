import React from 'react'


const getColor =  (ansWord, word) => {
    const result = ansWord.split("");

  for (let i = 0; i < word.length; i++) {
    if (word[i] === result[i]) {
      result[i] = '*';
    }
  }

  for (let i = 0; i < ansWord.length; i++) {
    const idx = result.indexOf(word[i])
    if(idx !== -1 && result[idx]!=='*' && result[idx]!=='+'){
        result[i]='+'
        result[idx]=''
    }
       

  }

  return result.map((char) => {
    if(char==='*') return 'correct' 
    if(char==='+') return 'semiCorrect' 
    else return 'wrong'
  })
} 

const Row = ({word , isFinised, ansWord}) => {
    const color = isFinised ? getColor(ansWord,word): new Array(5).fill('')

    return(new Array(5).fill('').map((__ , cellIdx) => (
        <div  key={cellIdx} className={`boardCells ${color[cellIdx]}`}>
            {word[cellIdx] ?? ""}
        </div>
    )))
}

const Board = ({guesses,currentRow,currentWord,ansWord}) => {
  return (
    <div className='board'>
        {guesses.map((__ , rowIdx) => (
            <div key={rowIdx} className='boardRows '>
               <Row
                word ={rowIdx === currentRow ? currentWord : guesses[rowIdx]}
                isFinised={currentRow > rowIdx}
                ansWord={ansWord}
               /> 
            </div>
        ))}
    </div>
  )
}

export default Board