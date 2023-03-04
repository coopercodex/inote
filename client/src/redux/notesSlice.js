import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notes: []
}

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNotes: (state, action) => {
      state.notes = action.payload
    },
    removeFromNotes: (state, action) => {
      state.notes = state.notes.filter(n => n.id !== action.payload)
    },
  },
}) 

export const { addNotes, removeFromNotes } = notesSlice.actions;
export const selectItems = (state) => state.notes.notes;
export default notesSlice.reducer