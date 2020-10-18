const jwt = require('jsonwebtoken');
const app = require('../../util/configureApi');
const connectDB = require('../../util/db');
const User = require('../../models/User');
const config = require('../../config');

app.post('*', (req, res) => {
  let finalUser;
  connectDB()
    .then(() => {
      return User.findOne({ email: req.body.email });
    })
    .then(user => {
      if (!user) {
        throw new Error('No user found.');
      }

      finalUser = user;
      return user.comparePassword(req.body.password); // check if the password is correct
    })
    .then(isPasswordCorrect => {
      if (!isPasswordCorrect) {
        throw new Error('Invalid password!');
      }
        // pass the user id if the password is correct 
        // keep the password secret
        // this returns a promise where we get the promise from
      return jwt.sign({ userId: finalUser._id }, config.JWT_SECRET, {
        expiresIn: '1m', // toker is going to expire in 1 min
      });
    })
    .then(token => {
      res.status(200).json({
        result: {
          firstName: finalUser.firstName,
          lastName: finalUser.lastName,
          email: finalUser.email,
          token, // we use this token in all of our files to pass as requests to any of our api endpoints to make sure its a right user
        },
      });
    })
    .catch(err => {
      res.status(err.statusCode || 500).json({
        error: err.message,
      });
    });
});

module.exports = app;