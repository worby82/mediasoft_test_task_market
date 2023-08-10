import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import BrandsData from '../../../API/BrandsData'
import { IBrand } from '../../../app_interfaces'
// import { IBrandsItem } from '../../../components/ReviewItem/interface'

export const fetchBrandsData = createAsyncThunk(
  'data/fetchBrandsData',
  BrandsData.getAll
)

export interface DataState {
  data: Array<IBrand>
}

const initialState: DataState = {
  data: [],
}

export const brandsDataSlice = createSlice({
  name: 'brandsData',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBrandsData.fulfilled, (state, action: PayloadAction<Array<IBrand>>) => {
      state.data = action.payload;
    });
  },
});


export const {  } = brandsDataSlice.actions

export default brandsDataSlice.reducer