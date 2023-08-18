import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setSortedValue, updateProducts } from "../../store/reducers/data/productsDataSlice";

import { SortedValue } from "../../app_types";
import { NAME, PRICE, RAITING } from "../../app_constants";

import bemClassName from "../../utils/bem";
import './index.scss'

const sorting = bemClassName('sorting')

const Sorting = () => {
  const sortedValue = useSelector(
    (state: RootState) => state.productsData.sortedValue
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateProducts())    
  }, [sortedValue]);
  return (
    <div className={sorting()}>
      <select className={sorting('select')} value={sortedValue ?? ''} onChange={(e) => dispatch(setSortedValue(e.target.value !== '' ? e.target.value as SortedValue : null))}>
        <option defaultValue={''}>По умолчанию</option>
        <option value={NAME}>По названию</option>
        <option value={PRICE}>По цене</option>
        <option value={RAITING}>По рейтингу</option>
      </select>
    </div>
  )
}

export default Sorting;