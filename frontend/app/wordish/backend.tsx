export async function getRandomWord(): Promise<string> {
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/randomanswer')
    const data = await response.json();
    return data.answer;
}

export async function isValidWord(word: string): Promise<boolean> {
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL! 
        + '/validateword?' 
        + new URLSearchParams( {
        word: word,
    }).toString());
    const data = await response.json();
    return data.check;
}