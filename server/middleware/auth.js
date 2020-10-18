const jwt = require('jsonwebtoken'); // grab token
const config = require('../config'); // grab config

module.exports = function(req, res, next) {

  if (req.headers && req.headers.authorization) { // if we have headers and thet headers has auth
    try {
      req.user = jwt.verify(
        req.headers.authorization.split(' ')[1], // everything after "Bearer " and [1] is our auth token
        config.JWT_SECRET // the same thing as value when we create/sign the token
      );
    } catch (error) { // in case an error occurs
      return res.status(401).json({
        error: {
          msg: 'Failed to authenticate token!',
        },
      });
    }
  } else {
    return res.status(401).json({
      error: {
        msg: 'No token!',
      },
    });
  }

  return next(); // never gonna get called but its a good practice
};