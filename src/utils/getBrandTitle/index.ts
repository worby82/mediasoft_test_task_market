import { IBrand } from "../../app_interfaces";

const getBrandTitle = (id: number, brands: Array<IBrand>) => {
  if(brands && brands.length > 0) {
    return [...brands].find(brand => brand.id === id)!.title
  }
}

export default getBrandTitle;