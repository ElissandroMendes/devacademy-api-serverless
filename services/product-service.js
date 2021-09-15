module.exports = class ProductService {
  constructor(database) {
    this.database = database;
  }

  async create(data) {
    return this.database.create(data);
  }

  async update(id, values) {
    return this.database.update(id, values);
  }

  async patch(id, values) {
    return this.database.patch(id, values);
  }

  async findAll(filter) {
    return this.database.findAll(filter);
  }

  async findById(id) {
    return this.database.findById(id);
  }

  async delete(id) {
    return this.database.delete(id);
  }
}
