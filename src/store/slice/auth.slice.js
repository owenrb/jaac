import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authenticated: true,
  },
  reducers: {
    status: (state, action) => {
      //console.log({ module: 'around-journal', state, action })
      return { ...state, ...action.payload }
    },
  },
})

export const { status } = authSlice.actions
export default authSlice.reducer
