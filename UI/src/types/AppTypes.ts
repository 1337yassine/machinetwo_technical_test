export type Note = {
    title: string,
    id: number,
    description: string,
    date: string,
}

export type NoteArray = {
    notes: Note[]
}

export const BASE_URL = 'https://c9bc-196-70-57-101.eu.ngrok.io/'
