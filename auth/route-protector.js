const jwt = require('express-jwt');

const { SECRET, AUDIENCE, ISSUER } = process.env;

exports.check = jwt({
  secret: SECRET,
  audience: AUDIENCE,
  issuer: ISSUER,
}).unless({ path: ['/user_account'] });

/* eslint-disable camelcase */
exports.requireScope = scope => (
  (req, res, next) => {
    if (req.user) {
      const has_scopes = req.user.scope === scope;
      if (!has_scopes) {
        res.sendStatus(401);
        return;
      }
      next();
    } else if (req.path === '/user_account') {
      next();
    } else {
      res.sendStatus(401);
    }
  }
);
