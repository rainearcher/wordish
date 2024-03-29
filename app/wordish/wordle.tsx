'use client'
import {useState, useEffect } from 'react';
import WordleKeyboard from './wordle-keyboard'
import AttemptGrid from './attempt-grid';
import { getRandomWord, isValidWord } from './server';
import { LetterState } from './consts';
import { RowObject } from './consts';
import styles from './styles.module.css';
import { WobbleContext, SetWobbleContext } from './context';
import ReactModal from 'react-modal';

function AnswerButton({ans, onClick, className} : {ans: string, onClick: () => void, className?: string}) {
    return <button onClick={onClick} className={className}>{`The answer was ${ans}. Click to play again!`}</button>
}

function Wordle() {
    const [input, setInput] = useState("");
    const [curRow, setCurRow] = useState(0);
    const [answer, setAnswer] = useState("");
    const [gameEnd, setGameEnd] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [letterStates, setLetterStates] = useState<Map<string, LetterState>>(new Map<string, LetterState>());

    const [rows, setRows] = useState<Array<RowObject>>(getInitialRows());
    const [prevRow, setPrevRow] = useState(0);

    const [wobble, setWobble] = useState(false);

    function getInitialRows(): Array<RowObject> {
        let initialRows = [];
        for (let i=0; i < 6; i++)
        {
            initialRows.push({id: i, text: "", states: []});
        }
        return initialRows;
    }

    useEffect(() => {
        fetchAnswer()
            .catch(console.error);
    }, []);

    const fetchAnswer = async () => {
        const ans = await getRandomWord();
        setAnswer(ans.toUpperCase());
    }

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
        {
            setGameEnd(true);
            setGameWon(true);
        }
        const valid = await isValidWord(input);
        console.log("result of valid: ", valid);
        if (valid)
        {
            setCurRow(curRow + 1);
            setInput("");
            if (curRow == 5)
                setGameEnd(true);
        }
        else {
            setWobble(true);
        }
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

    function playAgain() {
        setInput("");
        setCurRow(0);
        fetchAnswer().catch(console.error);
        setGameEnd(false);
        setGameWon(false);
        setLetterStates(new Map<string, LetterState>());
        setRows(getInitialRows());
        setPrevRow(0);
    }

    return (
    <div className="flex flex-col items-center justify-center self-center relative"
        style={{width: "min(500px, 100dvw)", height: "min(100dvh, 1000px)"}}>
        <WobbleContext.Provider value={wobble}>
            <SetWobbleContext.Provider value={setWobble}>
                <AttemptGrid
                    input={input}
                    curRow={curRow}
                    ans={answer}
                    setLetterState={setLetterState}
                    rows={rows}
                    setRows={setRows}
                    prevRow={prevRow}
                    setPrevRow={setPrevRow}
                />
            </SetWobbleContext.Provider>
        </WobbleContext.Provider>
        <WordleKeyboard 
            onKeyPress={onKeyPress} 
            stateMap={letterStates}
        />
        <ReactModal 
            isOpen={gameEnd}
            className={`${styles.modalContent} ${gameWon ? styles.modalCorrect : styles.modalIncorrect}`}
            overlayClassName={{
                base: styles.modalOverlay,
                afterOpen: styles.modalOverlayAfterOpen,
                beforeClose: ""
            }}
            contentLabel="Game end!"
        >
            {gameEnd && <AnswerButton 
                ans={answer} 
                onClick={playAgain} 
                className="flex justify-between"
            />}
        </ReactModal>
    </div>
    )
}

export default Wordle;