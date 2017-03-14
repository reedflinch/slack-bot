const CIRCLE_BASE_URL = 'https://circleci.com/api/v1.1';
const request = require('superagent');

class Client {
  constructor(opts = {}) {
    const token = opts.token || process.env.CIRCLE_TOKEN;
    if (!token) { throw new Error('circle token is required'); }

    this.token = token;
  }

  get(params, cb) {
    request
      .get(`${CIRCLE_BASE_URL}${params.url}`)
      .set('Accept', 'application/json')
      .set('circle-token', this.token)
      .end(cb);
  }

  post(params, cb) {
    request
      .post(`${CIRCLE_BASE_URL}${params.url}`)
      .set('Accept', 'application/json')
      .set('circle-token', this.token)
      .send(params.data)
      .end(cb);
  }
}

module.exports = { Client };
