const { DynamoDbSchema, DynamoDbTable } = require("@aws/dynamodb-data-mapper");

const { Product } = require("../../../domain/models");

class DynamodbProduct extends Product {
  constructor(opts = {}) {
    super(opts);
    if (opts) {
      Object.keys(opts).forEach((key) => {
        this[key] = opts[key];
      });
    }
  }
}

Object.defineProperties(DynamodbProduct.prototype, {
  [DynamoDbTable]: {
    value: process.env.PRODUCTS_TABLE || "products",
  },
  [DynamoDbSchema]: {
    value: {
      id: {
        type: "String",
        keyType: "HASH",
      },
      name: { type: "String" },
      price: { type: "Number" },
    },
  },
});

module.exports = DynamodbProduct
