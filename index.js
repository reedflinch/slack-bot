const bodyParser = require('body-parser');
const express = require('express');
const routes = require('./routes');
const PORT = 3001;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes.initialize(app);

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
