import { useState, useEffect } from 'react';

function LetterSquare({letter="", color="transparent"}: {letter?: string, color?: string}) {
    
    return <div className={`flex w-20 h-20 border-white border-solid border-2 text-white m-1 rounded-md items-center justify-center text-5xl`}
                style={{backgroundColor: `${color}`}}>
      {letter}
      </div>
  }
  
function Row({text="", colors=[]} : {text?: string, colors?:Array<string>}) {
    let letters = text.split("");

    for (let i = text.length; i < 5; i++)
        letters.push("");

    if (colors.length == 0)
    {
        for (let i = 0; i < 5; i++)
            colors.push("transparent");
    }
    return <div className="flex flex-nowrap justify-center align-center">
        {letters.map((letter, i) => (
            <LetterSquare key={i}letter={letter} color={colors[i]}/>
        ))}
    </div>
}

function AttemptGrid({input="", curRow=0, ans="GHOST"} : {input?: string, curRow?: number, ans?: string}) {
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
        if (rows[curRow].text != input)
            setCurRow();
    }, [input]);

    useEffect(() => {
        if (prevRow != curRow)
        {
            updatePrevRowColors();
            setPrevRow(curRow);
        }
    }, [curRow]);

    function setCurRow() {
        const newRows = rows.map(row => {
        if (row.id == curRow)
        {
            return {
                id: row.id,
                text: input,
                colors: row.colors
            }
        }    
        else
            return row;
        })
        setRows(newRows);
    }

    function updatePrevRowColors()
    {
        let rowColors: Array<string> = [];
        console.log("ans: ", ans);
        console.log("input: ", rows[prevRow].text)
        for (let i=0; i < 5; i++)
        {
            const letter = rows[prevRow].text[i];
            if (letter === ans[i])
            {
                console.log("matching letter", letter);
                rowColors.push("green");
                continue;
            }
            const locs = getAllLocs(ans, letter);
            if (locs.length == 0)
            {
                console.log("letter not found: ", letter);
                rowColors.push("gray");
            }
            else if (locs.length == 1) {
                if (rows[prevRow].text[locs[0]] == letter)
                {
                    console.log("no double letter:", letter);
                    rowColors.push("gray");
                }
                else
                    rowColors.push("yellow");
            }
            else {
                rowColors.push("yellow");
            }
        }
        const newRows = rows.map(row => {
            if (row.id == prevRow)
            {
                return {
                    id: row.id,
                    text: row.text,
                    colors: rowColors
                };
            }
            else
                return row;
        })
        setRows(newRows);
    }

    function getAllLocs(str: string, letter: string): Array<number> {
        let locs = [];
        for (let i=0; i < str.length; i++) {
            if (str[i] == letter)
                locs.push(i);
        }    
        return locs;
    }

    return <div className="flex-col relative justify-center align-center w-96">
        {rows.map(row => (
        <Row key={row.id} text={row.text} colors={row.colors}/>
        ))}
    </div>
}

export default AttemptGrid;