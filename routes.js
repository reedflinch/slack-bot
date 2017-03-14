const handlers = require('./handlers');

function initialize(app) {
  app.post('/slashes', handlers.handleEvent);
}

module.exports = { initialize };
