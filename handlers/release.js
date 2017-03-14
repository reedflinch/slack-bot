const CircleCI = require('../circleci').Client;

const circleClient = new CircleCI();

function getRecentBuilds(service, cb) {
  const url = '/project/github/kustomer/' + service;
  circleClient.get({ url }, cb);
}

function handleEvent(body, cb) {
  const text = body.text;
  if (!text) {
    return cb('Expected /release [service]');
  }

  getRecentBuilds(text, (err, response) => {
    if (err) {
      return cb(`Error fetching builds for service ${text}`);
    }

    const builds = response.body;
    const lastRelease = builds.find((build) => (build.vcs_tag || '').startsWith('release-'));

    if (!lastRelease) {
      return cb('No release found in last 30 builds');
    }

    const text =
`Last Release: ${lastRelease.vcs_tag}
By: ${lastRelease.user.name},
At: ${lastRelease.stop_time},
<${lastRelease.compare}|View Diff>
`;

    const data = {
      response_type: 'ephemeral',
      text: text,
    };

    cb(null, data);
  });
}

module.exports = { handleEvent };
