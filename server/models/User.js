const mongoose = require('mongoose');
const bycrypt = require('bcryptjs'); // allows us to hash the password

const UserSchema = new mongoose.Schema({
// capturing properties
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

UserSchema.pre('save', function(next) { // before it's faced
  const user = this;

  if (!user.isModified('password')) { // if the password has'nt been modified ignore it
    next(); // middleware
  } else {
    bycrypt.hash(user.password, 10).then(hashedPassword => {
      user.password = hashedPassword;
      next(); // continue on normal way
    });
  }
});

// when using mongoose we need to use the anonymus function because of its usage of .this
UserSchema.method('comparePassword', function(candidatePassword) {
  const user = this;

  return bycrypt.compare(candidatePassword, user.password);
});

module.exports = mongoose.model('User', UserSchema);