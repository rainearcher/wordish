'use server'

const backend_url = process.env.BACKEND_URL;

export async function getRandomWord(): Promise<string> {
    const response = await fetch(backend_url + '/randomanswer', { cache: 'no-store' })
    const data = await response.json();
    console.log(data.answer);
    return data.answer;
}

export async function isValidWord(word: string): Promise<boolean> {
    const response = await fetch(backend_url 
        + '/validateword?' 
        + new URLSearchParams( {
        word: word,
    }).toString());
    const data = await response.json();
    return data.check;
}