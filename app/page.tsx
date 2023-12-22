

function LetterSquare({letter}: {letter?: string}) {
  return <div className="flex-grow bg-transparent border-white border-solid border-2 text-black inline-block m-1 aspect-square rounded-md">
    {letter}
    </div>
}

function Row() {
  return <div className="flex relative flex-nowrap">
    <LetterSquare/>
    <LetterSquare/>
    <LetterSquare/>
    <LetterSquare/>
    <LetterSquare/>
  </div>
}

function Grid() {
  return <div className="flex-col relative w-screen text-center max-w-screen-sm">
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
    <div className="home">
      <Grid/>
    </div>
    
  )
}
