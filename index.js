'use strict';

const Bot = require('./Bot');
const request = require('superagent');

const circleAPI = 'https://circleci.com/api/v1.1';
const circleToken = process.env.CIRCLE_TOKEN;

const bot = new Bot({
  token: process.env.SLACK_TOKEN,
  autoReconnect: true,
  autoMark: true
});

// Take the message text and return the arguments
function getArgs(msg) {
  return msg.split(' ').slice(1);
}

function getCircleUser(user, cb) {
  request
    .get(circleAPI + '/me')
    .set('Accept', 'application/json')
    .set('circle-token', circleToken)
    .end((err, res) => {
      if (err) {
        cb(err);
        return;
      }

    cb(null, res.body.name);
  });
}

function getRecentBuilds(service, user, cb) {
  let url = '/project/github/kustomer/' + service + '/tree/master';

  request
    .get(circleAPI + url)
    .set('Accept', 'application/json')
    .set('circle-token', circleToken)
    .end((err, res) => {
      if (err) {
        cb(err);
        return;
      }

    cb(null, res);
  });
}

bot.respondTo('user', (message, channel, user) => {
  if (user && user.is_bot) {
    return;
  }

  getCircleUser(user, (err, result) => {
    if (err) {
      bot.send(`Error getting Circle user`, channel);
      console.error(err);
      return;
    }

    return bot.send('Your CircleCI username is: ' + result, channel);
  });
}, true);

bot.respondTo('builds', (message, channel, user) => {
  if (user && user.is_bot) {
    return;
  }

  getRecentBuilds('sobjects', user, (err, result) => {
    if (err) {
      bot.send(`Error getting recent builds`, channel);
      console.error(err);
      return;
    }

    console.log('\nresult = ', result);

    return bot.send(result, channel);
  });
}, true);
