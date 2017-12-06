const jwt = require('jsonwebtoken');
const _ = require('lodash');

const { SECRET, AUDIENCE, ISSUER } = process.env;

const genJti = () => {
  let jti = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
  for (let i = 0; i < 16; i += 1) {
    jti += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return jti;
};

exports.createIdToken = user => (
  jwt.sign(_.omit(user, 'access_token'), SECRET, { expiresIn: '10h' })
);

exports.createAccessToken = () => (
  jwt.sign({
    iss: ISSUER,
    aud: AUDIENCE,
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    jti: genJti(),
    scope: 'full_access',
    alg: 'HS256',
  }, SECRET)
);

