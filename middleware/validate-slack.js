const SLACK_TOKEN = process.env.SLACK_TOKEN;

function validate (req, res, next) {
  const token = req.body.token;
  if (token !== SLACK_TOKEN) {
    return res.sendStatus(403);
  }

  next();
}

module.exports = { validate };
