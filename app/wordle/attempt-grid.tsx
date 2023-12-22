import { useState } from 'react';

function LetterSquare({letter=""}: {letter?: string}) {
    return <div className="flex w-20 h-20 bg-transparent border-white border-solid border-2 text-white m-1 rounded-md items-center justify-center text-5xl">
      {letter}
      </div>
  }
  
function Row({text=""} : {text?: string}) {
let letters = text.split("");

for (let i = text.length; i < 5; i++)
    letters.push("");

return <div className="flex flex-nowrap justify-center align-center">
    {letters.map((letter, i) => (
        <LetterSquare key={i}letter={letter}/>
    ))}
</div>
}

function AttemptGrid({input="", curRow=0} : {input?: string, curRow?: number}) {
const [rows, setRows] = useState<Array<string>>(["", "", "", "", "", ""]);

function updateRowsOnInputChange() {
    if (rowChanged)
    {
    setCurRow();
    }
}

const rowChanged = rows[curRow] != input;

function setCurRow() {
    const newRows = rows.map((text, i) => {
    if (i == curRow)
        return input;
    else
        return text;
    })
    setRows(newRows);
}

updateRowsOnInputChange();
return <div className="flex-col relative justify-center align-center w-96">
    {rows.map((text, i) => (
    <Row key={i} text={text}/>
    ))}
</div>
}

export default AttemptGrid;