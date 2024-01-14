'use server'

import { promises as fs } from "fs";

export async function getRandomWord(): Promise<string> {
    const file = await fs.readFile(process.cwd() + '/app/wordish/answers.txt', 'utf8');
    const answers = file.split('\n');
    const answer = answers[Math.floor(Math.random() * answers.length)].trim();
    console.log(answer);
    return answer;
}

export async function isValidWord(word: string): Promise<boolean> {
    const file = await fs.readFile(process.cwd() + '/app/wordish/words.txt', 'utf8');
    const answers = file.split(/\r*\n/);
    return answers.includes(word.toLowerCase());
}