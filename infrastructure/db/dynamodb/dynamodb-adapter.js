const DynamoDB = require("aws-sdk/clients/dynamodb");
const { DataMapper } = require("@aws/dynamodb-data-mapper");

const { Endpoint } = require("aws-sdk");
const uuid = require("uuid").v4;

const DatabaseAdapter = require("../database-adapter");
const DynamodbProduct = require("./dynamodb-product");

const forAwaitOf = require("../../helpers/for-await-of");
const { NotFoundError } = require("../../errors/errors");

class DynamodbAdapter extends DatabaseAdapter {
  constructor() {
    super();

    this._client = new DynamoDB(
      process.env.DYNAMODB_ENDPOINT
        ? { endpoint: new Endpoint(process.env.DYNAMODB_ENDPOINT) }
        : undefined
    );
    this._mapper = new DataMapper({ client: this._client });
    this._modelClass = DynamodbProduct;
  }

  async save(instance) {
    instance.validate()
    return this._mapper.put(instance, { onMissing: "skip" });
  }

  async create(data) {
    const instance = new this._modelClass(Object.assign({ id: uuid() }, data));
    await this.save(instance);
    return instance;
  }

  async update(id, values) {
    const instance = new this._modelClass({ id, ...values });
    return this.save(instance);
  }

  async patch(id, values) {
    const instance = await this.findById(id);
    const newValues = { id, ...values };
    Object.keys(newValues).forEach((key) => {
      instance[key] = newValues[key];
    });
    return this.save(instance);
  }

  async findAll(filter) {
    const records = [];
    const scanFilter = {
      filter: {
        type: "And",
        conditions: [
          filter || {
            type: "Function",
            name: "attribute_exists",
            subject: "id",
          },
        ],
      },
    };
    const iterator = this._mapper.scan(this._modelClass, scanFilter);
    await forAwaitOf((record) => records.push(record), iterator);
    return records;
  }

  async findById(id) {
    try {
      const instance = await this._mapper.get(new this._modelClass({ id }));
      if (!instance.deletedAt) {
        return instance;
      }
    } catch (e) {
      if (e.name === "ItemNotFoundException") throw new NotFoundError("product not found");
      throw e;
    }
  }

  async delete(id) {
    const instance = await this.findById(id);

    if (instance) {
      return this._mapper.delete(instance, { onMissing: "skip" });
    }

    throw new NotFoundError("product not found");
  }
}

module.exports = DynamodbAdapter