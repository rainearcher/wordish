import { useState, useEffect, useContext } from 'react';
import { LetterState } from './consts';
import styles from './styles.module.css'
import { RowObject } from './consts';
import { WobbleContext, SetWobbleContext } from './context';
import { Flamenco } from 'next/font/google';

function LetterSquare({letter="", state=LetterState.Unguessed}: {letter: string, state: LetterState}) {
    const wobble = useContext(WobbleContext) && letter != "" && state ===LetterState.Unguessed;
    const setWobble = useContext(SetWobbleContext);
    
    const getColorFromState = () => {
        switch (state) {
            case (LetterState.Correct):
                return styles.letterCorrect;
            case (LetterState.Hinted):
                return styles.letterHinted;
            case (LetterState.Incorrect):
                return styles.letterIncorrect;
            default:
                return styles.letterUnguessed;
        }
    }

    return (
        <div className={`${styles.letter} ${wobble && styles.letterWobble}`}
            onAnimationEnd={() => setWobble(false)}>
            
                <div className={`${state === LetterState.Unguessed ? styles.letterInner : styles.letterInnerFlipped}
                                ${letter != "" && styles.letterTyped}`}>
                    <div className={styles.letterFront}>
                        {letter}
                    </div>
                    <div className={`${styles.letterBack} ${getColorFromState()}`}>
                        {letter}
                    </div>
                </div>
            
        </div>
    )
  }
  
function Row({text="", states=[]} : {text: string, states:Array<LetterState>}) {
    let letters = text.split("");

    for (let i = text.length; i < 5; i++)
        letters.push("");

    return <div className="flex flex-grow flex-nowrap justify-center align-center">
        {letters.map((letter, i) => (
            <LetterSquare key={i}letter={letter} state={states ? states[i] : LetterState.Unguessed}/>
        ))}
    </div>
}

function AttemptGrid({input="", curRow=0, ans="VALID", setLetterState, rows, setRows, prevRow, setPrevRow} : 
        {input: string, 
            curRow: number, 
            ans: string, 
            setLetterState: (l: string, s: LetterState) => void,
            rows: Array<RowObject>,
            setRows: (rows: Array<RowObject>) => void,
            prevRow: number,
            setPrevRow: (prevRow: number) => void
        }) {

    useEffect(() => {
        if (curRow >= 6)
            return;
        if (rows[curRow].text != input)
            updateCurRowWithInput();
    }, [input]);

    function updateCurRowWithInput() {
        updateRow({id: curRow, text: input, states: rows[curRow].states});
    }
    
    useEffect(() => {
        if (prevRow != curRow)
        {
            updatePrevRowStates();
            setPrevRow(curRow);
        }
    }, [curRow]);

    function updatePrevRowStates()
    {
        const rowStates = getPrevRowStates();
        updatePrevRowWithStates(rowStates);
    }

    function getPrevRowStates(): Array<LetterState> {
        let rowStates: Array<LetterState> = [];
        for (let i=0; i < 5; i++)
        {
            rowStates.push(getPrevRowIthLetterState(i));
        }
        return rowStates;
    }

    function getPrevRowIthLetterState(i: number): LetterState {
        const letter = rows[prevRow].text[i];
        const letterMatch = letter === ans[i];
        if (letterMatch)
        {
            setLetterState(letter, LetterState.Correct);
            return LetterState.Correct;
        }
        const ansLocs = getAllLetterIndicesInString(letter, ans);
        const rowLocs = getAllLetterIndicesInString(letter, rows[prevRow].text);
        const letterMoreFreqInAns = ansLocs.length > rowLocs.length;
        if (letterMoreFreqInAns) {
            setLetterState(letter, LetterState.Hinted);
            return LetterState.Hinted;
        }

        const letterNotInAns = ansLocs.length == 0;
        const letterCorrectInOtherSpotInRow = ansLocs.length == 1 && rows[prevRow].text[ansLocs[0]] == letter;
        const letterHintedInOtherSpotInRow = ansLocs.length == 1 && rows[prevRow].text.substring(0, i).includes(letter);
        const letterX3HintedInTwoOtherSpotsInRow = ansLocs.length == 2 && getAllLetterIndicesInString(letter, rows[prevRow].text.substring(0, i));
        if (letterNotInAns || letterCorrectInOtherSpotInRow || 
            letterHintedInOtherSpotInRow || letterX3HintedInTwoOtherSpotsInRow)
        {
            setLetterState(letter, LetterState.Incorrect);
            return LetterState.Incorrect;
        }
        setLetterState(letter, LetterState.Hinted);
        return LetterState.Hinted;
    }

    function getAllLetterIndicesInString(letter: string, str: string): Array<number> {
        let locs = [];
        for (let i=0; i < str.length; i++) {
            if (str[i] == letter)
                locs.push(i);
        }    
        return locs;
    }

    function updatePrevRowWithStates(rowStates: Array<LetterState>) {
        updateRow({id: prevRow, text: rows[prevRow].text, states: rowStates});
    }

    function updateRow(newRow: RowObject) {
        const newRows = rows.map(row => row.id == newRow.id ? newRow : row);
        setRows(newRows);
    }

    return <div className="flex-col relative justify-center align-center w-full"
                style={{}}>
        {rows.map(row => (
        <Row key={row.id} text={row.text} states={row.states}/>
        ))}
    </div>
}

export default AttemptGrid;