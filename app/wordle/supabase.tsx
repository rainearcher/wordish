import { createClient } from '@supabase/supabase-js'

export async function getRandomWord(): Promise<string> {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
    
    let { data: random_words, error } = await supabase
    .from('random_words')
    .select('word')
    .limit(1)
    .single()

    if (random_words != null)
        return random_words.word;
    else
        return "fail";

}

export async function isValidWord(word: string): Promise<boolean> {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
    
    let { data: random_words, error } = await supabase
    .from('random_words')
    .select('word')
    .eq('word', word.toLowerCase());
    
    return random_words != null && random_words.length != 0;
}