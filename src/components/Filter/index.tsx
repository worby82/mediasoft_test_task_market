import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "../../store";
import { ThunkDispatch } from "redux-thunk";
import { IBrand } from "../../app_interfaces";
import { fetchBrandsData } from "../../store/reducers/data/brandsDataSlice";
import {
  setSelectedBrand,
  updateProducts,
} from "../../store/reducers/data/productsDataSlice";

import bemClassName from "../../utils/bem";
import "./index.scss";

const filter = bemClassName("filter");

const Filter = () => {
  const brands = useSelector((state: RootState) => state.brandsData.data);
  const selectedBrand = useSelector((state: RootState) => state.productsData.selectedBrand);
  
  const dispatch = useDispatch();
  const dispatchAsync = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    dispatchAsync(fetchBrandsData());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(updateProducts());
  }, [selectedBrand]);
  return (
    <ul className={filter()}>
      {brands && (
        <>
          <li
            className={filter("item", { active: selectedBrand === null })}
            onClick={() => dispatch(setSelectedBrand(null))}
          >
            Все бренды
          </li>
          {brands.map((item: IBrand) => {
            return (
              <li
                className={filter("item", {
                  active: selectedBrand === item.id,
                })}
                onClick={() => dispatch(setSelectedBrand(item.id))}
                key={item.id}
              >
                {item.title}
              </li>
            );
          })}
        </>
      )}
    </ul>
  );
};

export default Filter;