const rows = ["QWERTYUIOP", "ASDFGHJKL+", "ZXCVBNM-"];

const getColor = (letter, ansWord, guesses) => {
  const ind = ansWord.indexOf(letter);
  if (ind === -1) return "wrong";

  if (guesses.find((guess) => guess[ind] === letter)) return "correct";

  return "semiCorrect";
};

const Keyboard = ({ letters, ansWord, guesses, onKeyPress }) => ( // Add onKeyPress prop
  <div className="keyboard">
    {rows.map((row, rowIdx) => (
      <div key={rowIdx} className="keyboardRow">
        {row.split("").map((letter, letterIdx) => (
          <button 
            key={letterIdx}
            className={`keyboardLetter ${
              letters.includes(letter) && getColor(letter, ansWord, guesses)
            }`}
            onClick={() => {
              if (letter === '+') {
                onKeyPress({ key: 'Enter', keyCode: 13 });
              } else if (letter === '-') {
                onKeyPress({ key: 'Backspace', keyCode: 8 });
              } else {
                onKeyPress({ key: letter, keyCode: letter.charCodeAt(0) });
              }
            }}
          >
            {letter === "+" ? "Enter" : letter === "-" ? "Delete" : letter}
          </button>
        ))}
      </div>
    ))}
  </div>
);

export default Keyboard;