import { configureStore } from '@reduxjs/toolkit';
import windowSlice from './reducers/window/windowSlice';
import brandsDataSlice from './reducers/data/brandsDataSlice';
import productsDataSlice from './reducers/data/productsDataSlice';
import cartDataSlice from './reducers/data/cartDataSlice';

export const store = configureStore({
  reducer: {
    productsData: productsDataSlice,
    cartData: cartDataSlice,
    brandsData: brandsDataSlice,
    window: windowSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch