import { createSlice } from '@reduxjs/toolkit'

const expressionSlice = createSlice({
  name: 'expression',
  initialState: {
    dirty: false,
    entries: [],
    error: null,
    version: 0,
  },
  reducers: {
    slide: (state, action) => {
      return { ...state, ...action.payload }
    },
  },
})

export const { slide } = expressionSlice.actions
export default expressionSlice.reducer
