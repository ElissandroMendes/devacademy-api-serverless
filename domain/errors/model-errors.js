class AttributeInvalid extends Error {
  constructor(message) {
    super(message);
    this.name = 'AttributeInvalid';
    this.code = 'VALIDATION_ERROR';
    this.statusCode = 422;
  }
}

module.exports = {
  AttributeInvalid
}
