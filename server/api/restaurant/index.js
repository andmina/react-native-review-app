const app = require("../../util/configureApi");
const connectDB = require("../../util/db");
const Restaurant = require("../../models/Restaurant");

// protect route by adding middleware
app.get('*', require('../../middleware/auth'), (req, res) => { // "*, req, res is a middleware"
  connectDB()
    .then(() => {
      const { _id } = req.query;
      if (_id) {
        return Restaurant.findOne({ _id });
      }

      return Restaurant.find();
    })
    .then(result => {
      res.status(200).json({
        result
      });
    })
    .catch(err => {
      res.status(err.statusCode || 500).json({
        error: err.message
      });
    });
});

module.exports = app;
