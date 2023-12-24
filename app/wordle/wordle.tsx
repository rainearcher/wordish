'use client'
import {useState, useEffect} from 'react';
import WordleKeyboard from './wordle-keyboard'
import AttemptGrid from './attempt-grid';
import { getRandomWord, isValidWord } from './supabase';
import { LetterState } from './consts';

function Answer({ans} : {ans: string}) {
    return <div>{`The answer was ${ans}.`}</div>
}

function Wordle() {
    const [input, setInput] = useState("");
    const [curRow, setCurRow] = useState(0);
    const [answer, setAnswer] = useState("");
    const [gameEnd, setGameEnd] = useState(false);
    const [letterStates, setLetterStates] = useState<Map<string, LetterState>>(new Map<string, LetterState>());
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
        if (gameEnd)
            return;
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
            setGameEnd(true);
        const valid = await isValidWord(input);
        console.log("result of valid: ", valid);
        if (valid)
        {
            setCurRow(curRow + 1);
            setInput("");
        }
        if (curRow == 5)
            setGameEnd(true);
    }

    const maxInputLengthReached = input.length >= 5;

    const isAlphaButton = (button: string): boolean => (
        button.length == 1 && button.match(/[a-z]/i) != null
    );

    const onAlphaPress = (button: string): void => setInput(input + button);

    function setLetterState(letter: string, newState: LetterState): void {
        const curState = letterStates.get(letter);
        if (!curState || curState < newState) {
            setLetterStates(new Map(letterStates.set(letter, newState)));
        }
    }

    return (
    <div className="flex flex-col items-center justify-center self-center"
        style={{width: "min(500px, 100dvw)", height: "min(90dvh, 1000px)"}}>
        <AttemptGrid input={input} curRow={curRow} ans={answer} setLetterState={setLetterState}/>
        <WordleKeyboard onKeyPress={onKeyPress} stateMap={letterStates}/>
        {gameEnd && <Answer ans={answer}/>}
    </div>
    )
}

export default Wordle;