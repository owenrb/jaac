import { createSlice } from '@reduxjs/toolkit'

const aroundSlice = createSlice({
  name: 'around',
  initialState: {
    dirty: false,
    entries: [],
    error: null,
    version: 0,
  },
  reducers: {
    slide: (state, action) => {
      //console.log({ module: 'around-journal', state, action })
      return { ...state, ...action.payload }
    },
  },
})

export const { slide } = aroundSlice.actions
export default aroundSlice.reducer
