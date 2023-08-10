import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface DataState {
  windowWidth: number
}

const initialState: DataState = {
  windowWidth: 0,
}

export const windowSlice = createSlice({
  name: 'window',
  initialState,
  reducers: {
    setWindowWidth: (state, action: PayloadAction<number>) => {
      state.windowWidth = action.payload
    },
  },
})

export const { setWindowWidth } = windowSlice.actions

export default windowSlice.reducer