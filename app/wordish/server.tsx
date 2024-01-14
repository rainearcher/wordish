'use server'
import { promises as fs } from "fs";

export async function getRandomWord(): Promise<string> {
    const file = await fs.readFile('/answers.txt', 'utf8');
    const answers = file.split('\n');
    const answer = answers[Math.floor(Math.random() * answers.length)].trim();
    console.log(answer);
    return answer;
}

export async function isValidWord(word: string): Promise<boolean> {
    const file = await fs.readFile('/words.txt', 'utf8');
    const words = file.split(/\r*\n/);
    return words.includes(word.toLowerCase());
}