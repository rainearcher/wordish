'use server'
import { words } from "./words";
import { answers } from "./answers";

export async function getRandomWord(): Promise<string> {
    const answer = answers[Math.floor(Math.random() * answers.length)].trim();
    console.log(answer);
    return answer;
}

export async function isValidWord(word: string): Promise<boolean> {
    return words.includes(word.toLowerCase());
}