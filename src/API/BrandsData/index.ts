export default class BrandsData {
  static async getAll() {
      let response = await fetch(`/brands.json`);
      let data = await response.json();
      return data;
  }
}