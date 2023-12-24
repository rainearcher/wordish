'use client'
import {useState, useEffect} from 'react';
import WordleKeyboard from './wordle-keyboard'
import AttemptGrid from './attempt-grid';
import { getRandomWord, isValidWord } from './supabase';

function Wordle() {
    const [input, setInput] = useState("");
    const [curRow, setCurRow] = useState(0);
    const [answer, setAnswer] = useState("");
    const [gameWon, setGameWon] = useState(false);
    useEffect(() => {
        const fetchWord = async () => {
            const ans = await getRandomWord();
            console.log(ans.toUpperCase());
            setAnswer(ans.toUpperCase());
        }
        fetchWord()
            .catch(console.error);
    }, []);

    async function onKeyPress(button: string): Promise<void> {
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

    async function onEnterPress(): Promise<void> {
        if (input.length < 5)
            return;
        if (input == answer)
            setGameWon(true);
        const valid = await isValidWord(input);
        console.log("result of valid: ", valid);
        if (valid)
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
    <div className="flex flex-col items-center justify-center self-center"
        style={{width: "min(500px, 100dvw)", height: "min(90dvh, 1000px)"}}>
        <AttemptGrid input={input} curRow={curRow} ans={answer}/>
        <WordleKeyboard onKeyPress={onKeyPress}/>
    </div>
    )
}

export default Wordle;