'use client'
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import {useState} from 'react';

function LetterSquare({letter=""}: {letter?: string}) {
  return <div className="flex w-20 h-20 bg-transparent border-white border-solid border-2 text-white m-1 rounded-md items-center justify-center text-5xl">
    {letter}
    </div>
}

function Row({text=""} : {text?: string}) {
  let letters = [];
  for (let i = 0; i < 5; i++)
  {
    if (i < text.length)
      letters.push({letter: text[i].toUpperCase()});
    else
      letters.push({letter: ""});
  }

  return <div className="flex flex-nowrap justify-center align-center">
    {letters.map(letterSquare => (
        <LetterSquare letter={letterSquare.letter}/>
      ))}
  </div>
}

function Grid({input="", curRow=0} : {input?: string, curRow?: number}) {
  const [rows, setRows] = useState<Array<string>>(["", "", "", "", "", ""]);
  if (rows[curRow] != input)
  {
    let oldRows = rows;
    oldRows[curRow] = input;
    setRows(rows);
  }
  return <div className="flex-col relative justify-center align-center w-96">
    {rows.map(text => (
      <Row text={text}/>
    ))}
  </div>
}

function WordleKeyboard({onKeyPress}: {onKeyPress: any}) {
  return (
  <Keyboard
    onKeyPress={onKeyPress}
    theme="hg-theme-default keyboard"
    layout={{
      default: [
        "Q W E R T Y U I O P",
        "A S D F G H J K L",
        "{enter} Z X C V B N M {bksp}"
      ],
      
    }}
    buttonTheme={[
      {
        class: "text-black",
        buttons: "Q W E R T Y U I O P A S D F G H J K L Z X C V B N M {bksp} {enter}"
      }
    ]} 
    display={{
      '{bksp}': 'back',
      '{enter}': 'enter'
    }}

  />)
}

export default function Home() {
  const [input, setInput] = useState("");
  const [curRow, setCurRow] = useState(0);

  let onKeyPress = (button: string): void => {
    if (button == "{bksp}")
    {
      setInput(input.slice(0, -1));
      console.log("backspace pressed");
    }
    else if (button == "{enter}")
    {
      console.log("enter key pressed");
      if (input.length == 5)
      {
        setCurRow(Math.min(curRow + 1, 5));
        setInput("");
      }
      else
        return
    }
    else if (input.length == 5)
    {
      return
    }
    else if (button.length == 1 && button.match(/[a-z]/i))
    {
      setInput(input + button);
      console.log("alphabet char pressed");
    }
    console.log("ButtonPressed", button);
  }
  return (
  <div className="flex flex-col items-center justify-center h-screen">
    <Grid input={input} curRow={curRow}/>
    <WordleKeyboard onKeyPress={onKeyPress}/>
  </div>
  )
}
