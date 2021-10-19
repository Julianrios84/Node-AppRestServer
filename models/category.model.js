const { Schema, model } = require('mongoose');

const categorySchema = Schema({
  name: {
    type: String,
    unique: true,
    required: [
      true,
      'Name is required.'
    ]
  },
  status: {
    type: Boolean,
    default: true,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})


categorySchema.methods.toJSON = function() {
  const { __v, ...category } = this.toObject();
  return category;
}

module.exports = model('Category', categorySchema)