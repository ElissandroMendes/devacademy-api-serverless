module.exports = {
  NotFoundError: class extends Error { constructor(message) { super(message); this.code = 'NOTFOUND_ERROR'; this.statusCode = 404; } },
}
