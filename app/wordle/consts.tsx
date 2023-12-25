export enum LetterState {
    Correct = 4,
    Hinted = 3,
    Incorrect = 2,
    Unguessed = 1
}

export interface RowObject {
    id: number,
    text: string,
    states: Array<LetterState>
}