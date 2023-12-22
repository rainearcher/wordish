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

function AttemptGrid({input="", curRow=0} : {input?: string, curRow?: number}) {
  const [rows, setRows] = useState<Array<string>>(["", "", "", "", "", ""]);
  if (rows[curRow] != input)
  {
    const newRows = rows.map((text, i) => {
      if (i == curRow)
        return input;
      else
        return text;
    })
    setRows(newRows);
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

export default function Wordle() {
  const [input, setInput] = useState("");
  const [curRow, setCurRow] = useState(0);

  function onKeyPress(button: string): void {
    console.log("button pressed: ", button);
    if (isBackspaceButton(button))
    {
      onBackspacePress();
    }
    
    else if (isEnterButton(button))
    {
      onEnterPress();
    }

    else if (maxInputLengthReached)
    {
      return;
    }

    else if (isAlphaButton(button))
    {
      onAlphaPress(button);
    }
  }

  const isBackspaceButton = (button: string): boolean => button == "{bksp}";

  const onBackspacePress = (): void => setInput(input.slice(0, -1));

  const isEnterButton = (button: string): boolean => button == "{enter}";

  function onEnterPress(): void {
    if (curRow < 5 && input.length == 5)
    {
      setCurRow(curRow + 1);
      setInput("");
    }
  }

  const maxInputLengthReached = input.length >= 5;

  const isAlphaButton = (button: string): boolean => (
    button.length == 1 && button.match(/[a-z]/i) != null
  );

  const onAlphaPress = (button: string): void => setInput(input + button);

  return (
  <div className="flex flex-col items-center justify-center h-screen">
    <AttemptGrid input={input} curRow={curRow}/>
    <WordleKeyboard onKeyPress={onKeyPress}/>
  </div>
  )
}
