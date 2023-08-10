export default class ProductsData {
  static async getAll() {
      let response = await fetch(`/products.json`);
      let data = await response.json();
      return data;
  }
}