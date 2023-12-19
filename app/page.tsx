

function LetterSquare({letter}: {letter?: string}) {
  return <div className="square">{letter}</div>
}

function Row() {
  return <div className="row">
    <LetterSquare/>
    <LetterSquare/>
    <LetterSquare/>
    <LetterSquare/>
    <LetterSquare/>
  </div>
}

function Grid() {
  return <div style={{display: "block"}}>
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
    <main>
      <Grid/>
    </main>
    
  )
}
