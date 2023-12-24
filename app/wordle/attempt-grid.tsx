import { useState, useEffect } from 'react';
import { LetterState } from './consts';

function LetterSquare({letter="", state=LetterState.Unguessed}: {letter: string, state: LetterState}) {
    const [color, setColor] = useState("transparent");
    useEffect(() => {
        setColor(getColorFromState());
    }, [state]);
    function getColorFromState() {
        switch (state) {
            case (LetterState.Correct):
                return "green";
            case (LetterState.Hinted):
                return "yellow";
            case (LetterState.Incorrect):
                return "gray";
            case (LetterState.Unguessed):
                return "transparent";
        }
    }

    return <div className={`flex flex-1 border-white border-solid border-2 text-white m-1 rounded-md items-center justify-center text-5xl aspect-square`}
                style={{backgroundColor: `${color}`}}>
            {letter}
            </div>
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

function AttemptGrid({input="", curRow=0, ans="VALID"} : {input: string, curRow: number, ans: string}) {
    interface RowObject {
        id: number,
        text: string,
        states: Array<LetterState>
    }
    const [rows, setRows] = useState<Array<RowObject>>(getInitialRows());
    const [prevRow, setPrevRow] = useState(0);

    function getInitialRows(): Array<RowObject> {
        let initialRows = [];
        for (let i=0; i < 6; i++)
        {
            initialRows.push({id: i, text: "", states: []});
        }
        return initialRows;
    }

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
        const rowColors = getPrevRowStates();
        updatePrevRowWithColors(rowColors);
    }

    function getPrevRowStates(): Array<LetterState> {
        let rowColors: Array<LetterState> = [];
        for (let i=0; i < 5; i++)
        {
            rowColors.push(getPrevRowIthLetterColor(i));
        }
        return rowColors;
    }

    function getPrevRowIthLetterColor(i: number): LetterState {
        const letter = rows[prevRow].text[i];
        const letterMatch = letter === ans[i];
        if (letterMatch)
        {
            return LetterState.Correct;
        }
        const ansLocs = getAllLetterIndicesInString(letter, ans);
        const letterNotInAns = ansLocs.length == 0;
        const letterCorrectInOtherSpotInRow = ansLocs.length == 1 && rows[prevRow].text[ansLocs[0]] == letter;
        const letterHintedInOtherSpotInRow = ansLocs.length == 1 && rows[prevRow].text.substring(0, i).includes(letter);
        const letterX3HintedInTwoOtherSpotsInRow = ansLocs.length == 2 && getAllLetterIndicesInString(letter, rows[prevRow].text.substring(0, i));
        if (letterNotInAns || letterCorrectInOtherSpotInRow || 
            letterHintedInOtherSpotInRow || letterX3HintedInTwoOtherSpotsInRow)
        {
            return LetterState.Incorrect;
        }
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

    function updatePrevRowWithColors(rowStates: Array<LetterState>) {
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