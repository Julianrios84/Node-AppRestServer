const { Schema, model } = require('mongoose');

const usersSchema = Schema({
  name: {
    type: String,
    required: [
      true,
      'Name is required.'
    ]
  },
  email: {
    type: String,
    required: [
      true,
      'Email is required.'
    ]
  },
  password: {
    type: String,
    required: [
      true,
      'Password is required.'
    ]
  },
  image: {
    type: String
  },
  role: {
    type: String,
    required: true,
    emun: ['ADMIN', 'USER']
  },
  status: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }
})

usersSchema.methods.toJSON = function() {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id
  return user;
}

module.exports = model('users', usersSchema)