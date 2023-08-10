import { IProductItem } from "../../app_interfaces";
import bemClassName from "../../utils/bem";

import "./index.scss";

const productItem = bemClassName('product-item');

const ProductItem = ({product}: {product: IProductItem}) => {
  
  return (
    <div className={productItem()}>
      <img className={productItem("image")} src={product.image} alt={product.title} />

{/* <div class="product-item">
    <img class="product-item__image" :src="image" :alt="product.title" />
    <div class="product-item__info">
      <h3>{{ product.title }}</h3>
      <p>brand: {{ product.brand }}</p>
      <p>
        {{
          priceFormat(
            product.regular_price.currency,
            product.regular_price.value
          )
        }}
      </p>
      <template v-if="product.type !== 'simple'">
        <div
          class="product-item__options"
          v-for="option in product.configurable_options"
          :key="option.attribute_id"
        >
          <template v-if="option.attribute_code === 'color'">
            <div
              class="product-item__option-item"
              :class="[
                {
                  'product-item__option-item--active':
                    selectedColor === value.value_index,
                },
                {
                  'product-item__option-item--disable':
                    !variantsId.includes(value.value_index) &&
                    variantsCode === 'size',
                },
              ]"
              v-for="value in option.values"
              :key="value.value_index"
              :style="{ 'background-color': value.value }"
              @click="
                variantsId.length !== 0 &&
                variantsCode !== null &&
                variantsCode === 'size'
                  ? variantsId.includes(value.value_index) &&
                    setSelectedColor(value.value_index)
                  : setSelectedColor(value.value_index)
              "
            ></div>
          </template>
          <template v-else>
            <div
              class="product-item__option-item"
              :class="[
                {
                  'product-item__option-item--active':
                    selectedSize === value.value_index,
                },
                {
                  'product-item__option-item--disable':
                    !variantsId.includes(value.value_index) &&
                    variantsCode === 'color',
                },
              ]"
              v-for="value in option.values"
              :key="value.value_index"
              @click="
                variantsId.length !== 0 &&
                variantsCode !== null &&
                variantsCode === 'color'
                  ? variantsId.includes(value.value_index) &&
                    setSelectedSize(value.value_index)
                  : setSelectedSize(value.value_index)
              "
            >
              {{ value.label }}
            </div>
          </template>
        </div>
        <template v-if="selectedColor && selectedSize">
          <button
            v-if="!cartItems.some((item) => item.id === getProductId())"
            class="button"
            @click="setCartItem({ id: getProductId(), count: 1 })"
          >
            Add to cart
          </button>
          <p v-else>Product in the shopping cart</p>
        </template>
        <p v-else>Сhoose a color and size</p>
      </template>
      <template v-else>
        <button
          v-if="!cartItems.some((item) => item.id === getProductId())"
          class="button"
          @click="setCartItem({ id: getProductId(), count: 1 })"
        >
          Add to cart
        </button>
        <p v-else>Product in the shopping cart</p>
      </template>
    </div>
  </div> */}

    </div>
  )
}

export default ProductItem;