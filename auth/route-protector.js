const jwt = require('express-jwt');

const { SECRET, AUDIENCE, ISSUER } = process.env;

exports.jwtCheck = jwt({
  secret: SECRET,
  audience: AUDIENCE,
  issuer: ISSUER,
});

/* eslint-disable camelcase */
exports.requireScope = scope => (
  (req, res, next) => {
    const has_scopes = req.user.scope === scope;
    if (!has_scopes) {
      res.sendStatus(401);
      return;
    }
    next();
  }
);
