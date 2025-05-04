const rows = ["QWERTYUIOP", "ASDFGHJKL+", "ZXCVBNM-"];

const getColor = (letter, ansWord, guesses) => {
  const ind = ansWord.indexOf(letter);
  if (ind === -1) return "wrong";

  if (guesses.find((guess) => guess[ind] === letter)) return "correct";

  return "semiCorrect";
};

const Keyboard = ({ letters, ansWord, guesses }) => (
  <div className="keyboard">
    {rows.map((row, rowIdx) => (
      <div key={rowIdx} className="keyboardRow">
        {row.split("").map((letter, letterIdx) => (
          <div
            key={letterIdx}
            className={`keyboardLetter ${
              letters.includes(letter) && getColor(letter, ansWord, guesses)
            }`}
          >
            {letter === "+" ? "Enter" : letter === "-" ? "Delete" : letter}
          </div>
        ))}
      </div>
    ))}
  </div>
);

export default Keyboard;