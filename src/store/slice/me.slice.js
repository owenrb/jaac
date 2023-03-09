import { createSlice } from '@reduxjs/toolkit'

const meSlice = createSlice({
  name: 'me',
  initialState: {
    dirty: false,
    entries: [],
    error: null,
    version: 0,
  },
  reducers: {
    slide: (state, action) => {
      //console.log({ module: 'me-journal', state, action })
      return { ...state, ...action.payload }
    },
  },
})

export const { slide } = meSlice.actions
export default meSlice.reducer
