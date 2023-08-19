export default class ProductsData {
  static async getAll() {
      let response = await fetch(`/mediasoft_test_task_market/products.json`);
      let data = await response.json();
      return data;
  }
}