const handlers = require('./handlers');
const slack = require('./middleware/validate-slack');

function initialize(app) {
  app.post('/slashes', slack.validate, handlers.handleEvent);
}

module.exports = { initialize };
