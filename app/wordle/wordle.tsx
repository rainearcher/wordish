'use client'
import {useState, useEffect} from 'react';
import WordleKeyboard from './wordle-keyboard'
import AttemptGrid from './attempt-grid';
import getRandomWord from './supabase';

function Wordle() {
    const [input, setInput] = useState("");
    const [curRow, setCurRow] = useState(0);
    const [answer, setAnswer] = useState("");
    useEffect(() => {
        const fetchWord = async () => {
            setAnswer(await getRandomWord());
        }
        fetchWord()
            .catch(console.error);
    }, []);

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

export default Wordle;