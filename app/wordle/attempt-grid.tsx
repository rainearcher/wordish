import { useState, useEffect } from 'react';

function LetterSquare({letter="", color="transparent"}: {letter: string, color: string}) {
    
    return <div className={`flex flex-1 border-white border-solid border-2 text-white m-1 rounded-md items-center justify-center text-5xl aspect-square`}
                style={{backgroundColor: `${color}`}}>
            {letter}
            </div>
  }
  
function Row({text="", colors=[]} : {text: string, colors:Array<string>}) {
    let letters = text.split("");

    for (let i = text.length; i < 5; i++)
        letters.push("");

    return <div className="flex flex-grow flex-nowrap justify-center align-center">
        {letters.map((letter, i) => (
            <LetterSquare key={i}letter={letter} color={colors ? colors[i] : "transparent"}/>
        ))}
    </div>
}

function AttemptGrid({input="", curRow=0, ans="VALID"} : {input: string, curRow: number, ans: string}) {
    interface RowObject {
        id: number,
        text: string,
        colors: Array<string>
    }
    const [rows, setRows] = useState<Array<RowObject>>(getInitialRows());
    const [prevRow, setPrevRow] = useState(0);

    function getInitialRows(): Array<RowObject> {
        let initialRows = [];
        for (let i=0; i < 6; i++)
        {
            initialRows.push({id: i, text: "", colors: []});
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
        updateRow({id: curRow, text: input, colors: rows[curRow].colors});
    }
    
    useEffect(() => {
        if (prevRow != curRow)
        {
            updatePrevRowColors();
            setPrevRow(curRow);
        }
    }, [curRow]);

    function updatePrevRowColors()
    {
        const rowColors = getPrevRowColors();
        updatePrevRowWithColors(rowColors);
    }

    function getPrevRowColors(): Array<string> {
        let rowColors: Array<string> = [];
        for (let i=0; i < 5; i++)
        {
            rowColors.push(getPrevRowIthLetterColor(i));
        }
        return rowColors;
    }

    function getPrevRowIthLetterColor(i: number): string {
        const letter = rows[prevRow].text[i];
        const letterMatch = letter === ans[i];
        if (letterMatch)
        {
            return "green";
        }
        const ansLocs = getAllLetterIndicesInString(letter, ans);
        const letterNotInAns = ansLocs.length == 0;
        const letterHintedInOtherSpotInRow = ansLocs.length == 1 && rows[prevRow].text.substring(0, i).includes(letter);
        const letterX3HintedInTwoOtherSpotsInRow = ansLocs.length == 2 && getAllLetterIndicesInString(letter, rows[prevRow].text.substring(0, i));
        if (letterNotInAns || letterHintedInOtherSpotInRow || letterX3HintedInTwoOtherSpotsInRow)
        {
            return "gray";
        }
        return "yellow";
    }

    function getAllLetterIndicesInString(letter: string, str: string): Array<number> {
        let locs = [];
        for (let i=0; i < str.length; i++) {
            if (str[i] == letter)
                locs.push(i);
        }    
        return locs;
    }

    function updatePrevRowWithColors(rowColors: Array<string>) {
        updateRow({id: prevRow, text: rows[prevRow].text, colors: rowColors});
    }

    function updateRow(newRow: RowObject) {
        const newRows = rows.map(row => row.id == newRow.id ? newRow : row);
        setRows(newRows);
    }

    return <div className="flex-col relative justify-center align-center w-full"
                style={{}}>
        {rows.map(row => (
        <Row key={row.id} text={row.text} colors={row.colors}/>
        ))}
    </div>
}

export default AttemptGrid;