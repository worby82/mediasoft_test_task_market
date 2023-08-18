import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ICartProduct, ICartProductCount } from "../../../app_interfaces";

export interface ProductsDataState {
  cartProducts: Array<ICartProduct>;
}

const initialState: ProductsDataState = {
  cartProducts: [],
};

export const productsDataSlice = createSlice({
  name: "productsData",
  initialState,
  reducers: {
    setCartProduct: (
      state: ProductsDataState,
      action: PayloadAction<ICartProduct>
    ) => {
      state.cartProducts = [...state.cartProducts, action.payload];
    },
    setCartProductCount: (
      state: ProductsDataState,
      action: PayloadAction<ICartProductCount>
    ) => {
      state.cartProducts.find(
        (cartProduct) => action.payload.id === cartProduct.id
      )!.count = action.payload.count;
    },
    deleteCartProduct: (
      state: ProductsDataState,
      action: PayloadAction<number>
    ) => {
      state.cartProducts = [...state.cartProducts].filter(
        (item) => item.id !== action.payload
      );
    },
    clearCartProduct: (state: ProductsDataState) => {
      state.cartProducts = [];
    },
  },
});

export const {
  setCartProduct,
  setCartProductCount,
  deleteCartProduct,
  clearCartProduct,
} = productsDataSlice.actions;

export default productsDataSlice.reducer;