
module.exports = class DatabaseAdapter {
  async save(instance) {
    throw new Error('Method not implemented.')
  }

  async create(data) {
    throw new Error('Method not implemented.')
  }

  async update(id, values) {
    throw new Error('Method not implemented.')
  }

  async patch(id, values) {
    throw new Error('Method not implemented.')
  }

  async findAll(filter) {
    throw new Error('Method not implemented.')
  }

  async findById(id) {
    throw new Error('Method not implemented.')
  }

  async delete(id) {
    throw new Error('Method not implemented.')
  }
}
