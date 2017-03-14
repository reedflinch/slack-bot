const ReleaseHandler = require('./release');

const handlers = {
  '/release': ReleaseHandler,
}

function handleEvent(req, res) {
  const body = req.body || '';
  const handler = handlers[body.command];
  if (!handler) {
    return res.send(`missing handler for ${body.command}`);
  }

  handler.handleEvent(body, (err, data) => {
    if (err) { 
      console.log(err);
      res.send('Error processing command');
      return;
    }

    res.json(data);
  });
}

module.exports = { handleEvent };
