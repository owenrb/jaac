import { createSlice } from '@reduxjs/toolkit'

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    voices: [],
    defaultVoice: '',
    author: '',
    viewer: '',
  },
  reducers: {
    voices: (state, action) => {
      return { ...state, voices: action.payload }
    },
    saved: (state, action) => {
      return { ...state, ...action.payload }
    },
  },
})

export const { voices, saved } = settingsSlice.actions
export default settingsSlice.reducer
