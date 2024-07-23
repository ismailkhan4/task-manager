class HTTPError extends Error {
  _code = null;
  constructor(code, message) {
    super(message);
    this._code = code;
  }
  get code() {
    return this._code;
  }
}

module.exports = HTTPError;
