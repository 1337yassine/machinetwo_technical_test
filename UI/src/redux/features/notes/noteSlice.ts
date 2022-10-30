import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'



export interface NoteState {
  description: string,
  title: string,
  date: string,
}

const initialState: NoteState = {
  description: "",
  title: "",
  date: "",
}

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    addNote: (state) => {
        console.log("addNote", state);
    },
    editNote: (state) => {
        console.log("editNote", state);
    },
    deleteNote: (state) => {
        console.log("deleteNote", state);
    },
    getNoteByDate: (state) => {
        console.log("getNoteByDate", state);
    }
  },
})

export const { addNote,editNote,deleteNote } = noteSlice.actions
export default noteSlice.reducer
