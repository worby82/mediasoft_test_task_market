import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setCartProduct } from "../../store/reducers/data/cartDataSlice";

import { CONFIGURABLE, SIMPLE } from "../../app_constants";
import {
  IConfigurableOption,
  IFilteredOptions,
  ISelectedOption,
  IVariant,
  IVariantAttribute,
} from "../../app_interfaces";
import { IProductItemProps } from "./interface";

import bemClassName from "../../utils/bem";
import priceFormat from "../../utils/priceFormat";
import getBrandTitle from "../../utils/getBrandTitle";

import ConfigurableOptions from "../ConfigurableOptions";
import Button from "../../UI/Button";
import Rating from "../../UI/Rating";

import "./index.scss";

const productItem = bemClassName("product-item");

const ProductItem: React.FC<IProductItemProps> = ({ product }) => {
  const cartProducts = useSelector((state: RootState) => state.cartData.cartProducts);
  const brands = useSelector((state: RootState) => state.brandsData.data);

  const [selectedVariant, setSelectedVariant] = useState<IVariant | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Array<ISelectedOption>>([]);
  const [filteredOptions, setFilteredOptions] = useState<IFilteredOptions | null>(null);
  const [isHasInCart, setIsHasInCart] = useState(false);

  const dispatch = useDispatch();

  const getSelectedOption = (option: IConfigurableOption) => selectedOptions.find((item: ISelectedOption) => item.code === option.attribute_code)
  const getFilteredOptions = (option: IConfigurableOption) => filteredOptions && filteredOptions.code !== option.attribute_code ? filteredOptions : undefined

  const handleSetSelectedOptions = (option: ISelectedOption) => {
    if (selectedOptions) {
      if (
        selectedOptions.length > 0 &&
        selectedOptions.find((selectedOption: ISelectedOption) => selectedOption.code === option.code)
      ) {
        if (option.value_index !== null) {
          setSelectedOptions([option]);
        } else {
          setSelectedOptions([...selectedOptions].filter(
              (selectedOption: ISelectedOption) => selectedOption.code !== option.code
            ));
        }
      } else {
        setSelectedOptions([...selectedOptions, option]);
      }
    }
  };

  const handleAddToCart = useCallback(() => {

    const cartAtributes =
      product.type === CONFIGURABLE && selectedVariant
        ? selectedVariant.attributes.map((atribute: IVariantAttribute) => {
            const option = product.configurable_options!.find(
              (option) => option.attribute_code === atribute.code
            );
            return {
              code_label: option!.label,
              value_label: option!.values.find(
                (value) => value.value_index === atribute.value_index
              )!.label,
            };
          })
        : undefined;

    const cartProduct = {
      id: selectedVariant?.product.id ?? product.id,
      image: selectedVariant?.product.image ?? product.image,
      title: product.title,
      regular_price: product.regular_price,
      attributes: cartAtributes,
      count: 1,
      brand: getBrandTitle(product.brand, brands) ?? "",
    };
    dispatch(setCartProduct(cartProduct));
  }, [selectedVariant]);

  useEffect(() => {
    if (selectedOptions.length === product.configurable_options?.length) {
      if (product.variants) {
        setSelectedVariant(
          product.variants.find(
            (variant: IVariant) =>
              JSON.stringify(variant.attributes) ===
              JSON.stringify([...selectedOptions.sort((prev, next) => prev.code.localeCompare(next.code))])
          )
          ?? null
        );
      }
    } else if (selectedOptions.length > 0) {
      setSelectedVariant(null);
      const filteredVariants = product.variants?.filter(
        (variant: IVariant) =>
          variant.attributes.find(
            (atribute: IVariantAttribute) => atribute.code === selectedOptions[0].code)?.value_index === selectedOptions[0].value_index
      );
      const valueIndexes =
        filteredVariants!.map(
          (variant) => variant.attributes.find((atribute) => atribute.code !== selectedOptions[0].code)!.value_index
        )
        ?? null;
      setFilteredOptions({
        code: selectedOptions[0].code,
        valueIndexes: valueIndexes,
      });
    } else {
      setFilteredOptions(null);
    }
    // eslint-disable-next-line
  }, [selectedOptions]);

  useEffect(() => {
    if (product.type === SIMPLE) {
      setIsHasInCart(cartProducts.some((cartProduct) => cartProduct.id === product.id));
    } else if (selectedVariant) {
      setIsHasInCart(cartProducts.some((cartProduct) => cartProduct.id === selectedVariant.product.id));
    }
    // eslint-disable-next-line
  }, [selectedVariant, cartProducts]);

  return (
    <div className={productItem()}>
      <img
        className={productItem("image")}
        src={selectedVariant?.product.image ?? product.image}
        alt={product.title}
      />
      <div className={productItem("info")}>
        <h3>{product.title}</h3>
        <p>{getBrandTitle(product.brand, brands) ?? ""}</p>
        <p>
          {priceFormat(product.regular_price.currency, product.regular_price.value)}
        </p>
        <Rating count={product.rating} full />
        {product.type === "configurable" ? (
          <>
            {product.configurable_options &&
              product.configurable_options.map(
                (option: IConfigurableOption) => (
                  <ConfigurableOptions
                    key={option.attribute_id}
                    option={option}
                    handleExternal={handleSetSelectedOptions}
                    selectedOption={getSelectedOption(option)}
                    filteredOptions={getFilteredOptions(option)}
                  />
                )
              )}
            {selectedVariant ? (
              isHasInCart ? (
                <p className={productItem("cart-info")}>Уже в корзине</p>
              ) : (
                <Button
                  text="В корзину"
                  handleExternal={handleAddToCart}
                  externalClassName={productItem("button")}
                />
              )
            ) : (
              <p className={productItem("cart-info")}>Выберите атрибуты</p>
            )}
          </>
        ) : isHasInCart ? (
          <p className={productItem("cart-info")}>Уже в корзине</p>
        ) : (
          <Button
            text="В корзину"
            handleExternal={handleAddToCart}
            externalClassName={productItem("button")}
          />
        )}
      </div>
    </div>
  );
};

export default ProductItem;