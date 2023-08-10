import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react'
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { IProductItem } from "../../app_interfaces";
import { fetchProductsItemsData } from "../../store/reducers/data/productsDataSlice";

import bemClassName from "../../utils/bem";

import "./index.scss";
import ProductItem from "../ProductItem";

const productList = bemClassName('product-list');

const ProductList = () => {
  const products = useSelector((state: RootState) => state.productsData.products)
  const dispatchAsync = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    dispatchAsync(fetchProductsItemsData());
    // eslint-disable-next-line
  }, []);
  return (
    <div className={productList()}>
      { products && products.length > 0
        ? products.map((item: IProductItem) => {
            return <ProductItem key={item.id} product={item} />
          })
        : <h3>Products no found</h3>
      }
    </div>
  )
}

export default ProductList;