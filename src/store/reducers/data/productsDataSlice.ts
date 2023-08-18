import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { IProductItem } from "../../../app_interfaces";
import { SortedValue } from "../../../app_types";

import { getSortedProducts } from "../../../utils/getSortedProducts";
import ProductsData from "../../../API/ProductsData";

export const fetchProductsItemsData = createAsyncThunk(
  "data/fetchProductsItemsData",
  ProductsData.getAll
);

export interface ProductsDataState {
  data: Array<IProductItem>;
  products: Array<IProductItem>;
  selectedBrand: null | number;
  sortedValue: null | SortedValue;
}

const initialState: ProductsDataState = {
  data: [],
  products: [],
  selectedBrand: null,
  sortedValue: null,
};

export const productsDataSlice = createSlice({
  name: "productsData",
  initialState,
  reducers: {
    setSelectedBrand: (
      state: ProductsDataState,
      action: PayloadAction<null | number>
    ) => {
      state.selectedBrand = action.payload;
    },
    setSortedValue: (
      state: ProductsDataState,
      action: PayloadAction<SortedValue | null>
    ) => {
      state.sortedValue = action.payload;
    },
    updateProducts: (state: ProductsDataState) => {
      state.products =
        state.selectedBrand === null
          ? [...state.data]
          : [...state.data].filter(
              (item: IProductItem) => item.brand === state.selectedBrand
            );
      state.products = getSortedProducts(state.products, state.sortedValue);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchProductsItemsData.fulfilled,
      (state, action: PayloadAction<Array<IProductItem>>) => {
        state.data = action.payload;
        if (state.products.length === 0) {
          state.products = state.data;
        }
      }
    );
  },
});

export const { setSelectedBrand, updateProducts, setSortedValue } = productsDataSlice.actions;

export default productsDataSlice.reducer;