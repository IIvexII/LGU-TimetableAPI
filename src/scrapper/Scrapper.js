class Scrapper {
  /*
   * @params id<String>
   * @return one row in data
   */
  async getById(id) {
    const data = await this.data;
    const name = data[id];

    return { id, name };
  }
  /*
   * @params name<String>
   * @return one row in data
   */
  async getByName(name) {
    const data = await this.data;
    const id = Object.keys(data).find((key) => data[key] == name);
    return { id, name };
  }
  /*
   * @params none
   * @return all data available
   */
  async getAll() {
    return await this.data;
  }
}

module.exports = { Scrapper };
