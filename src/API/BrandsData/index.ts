export default class BrandsData {
  static async getAll() {
      let response = await fetch(`/mediasoft_test_task_market/brands.json`);
      let data = await response.json();
      return data;
  }
}