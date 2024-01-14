'use server'
import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

export async function getRandomWord(): Promise<string> {
    noStore();
    const { rows } = await sql`SELECT word FROM answers order by random() limit 1`;
    const answer = rows[0].word;
    console.log(answer);
    return answer;
}

export async function isValidWord(word: string): Promise<boolean> {
    noStore();
    const { rows } = await sql`SELECT word FROM words WHERE word=${word.toLowerCase()}`;
    return rows.length != 0;
}