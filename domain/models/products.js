const { AttributeInvalid } = require("../errors/model-errors");


module.exports = class Product {
  constructor({ id, name, price }) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  validate() {
    if (!this.name) {
      throw new AttributeInvalid('name is required.');
    }

    if (!this.price) {
      throw new AttributeInvalid('price attributte is required.');
    }

    if (this.price < 0) {
      throw new AttributeInvalid('price must greater than zero.');
    }
  }
}
