'use client'
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

function LetterSquare({letter}: {letter?: string}) {
  return <div className="flex-grow bg-transparent border-white border-solid border-2 text-black inline-block m-1 aspect-square rounded-md">
    {letter}
    </div>
}

function Row() {
  return <div className="flex relative flex-nowrap">
    <LetterSquare/>
    <LetterSquare/>
    <LetterSquare/>
    <LetterSquare/>
    <LetterSquare/>
  </div>
}

function Grid() {
  return <div className="flex-col relative text-center w-96">
    <Row/>
    <Row/>
    <Row/>
    <Row/>
    <Row/>
    <Row/>
  </div>
}

export default function Home() {
  return (
  <div className="flex flex-wrap items-center justify-center h-screen">
    <Grid/>
    <Keyboard
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
      
    />

  </div>
    
    
    
  )
}
