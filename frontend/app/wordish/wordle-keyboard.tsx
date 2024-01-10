import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import { LetterState } from './consts';
import { useState, useEffect } from 'react';

function WordleKeyboard({onKeyPress, stateMap}: {onKeyPress: (s: string) => Promise<void>, stateMap: Map<string, LetterState>}) {
    const [correctLetters, setCorrectLetters] = useState("");
    const [incorrectLetters, setIncorrectLetters] = useState("");
    const [hintedLetters, setHintedLetters] = useState("");

    function getFilteredLetters(includeState: LetterState): string {
        const letters: Array<string> = [];
        stateMap.forEach((state, letter) => {
            if (state == includeState) {
                letters.push(letter);
            }
        })
        return letters.join(" ");
    }
    useEffect(() => {
        setCorrectLetters(getFilteredLetters(LetterState.Correct));
        setIncorrectLetters(getFilteredLetters(LetterState.Incorrect));
        setHintedLetters(getFilteredLetters(LetterState.Hinted));
    }, [stateMap]);
    return (
    <Keyboard
        style = {{maxWidth: "min(500px, 100dvw);"}}
        onKeyPress={onKeyPress}
        theme="hg-theme-default wordle-keyboard"
        layout={{
        default: [
            "Q W E R T Y U I O P",
            "A S D F G H J K L",
            "{enter} Z X C V B N M {bksp}"
        ],
        
        }}
        buttonTheme={[
        {
            class: 'correct',
            buttons: correctLetters
        },
        {
            class: 'incorrect',
            buttons: incorrectLetters
        },
        {
            class: 'hinted',
            buttons: hintedLetters
        }
        ]} 
        display={{
        '{bksp}': 'back',
        '{enter}': 'enter'
        }}

    />)
}

  export default WordleKeyboard;