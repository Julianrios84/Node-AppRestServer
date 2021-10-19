const { Schema, model } = require('mongoose');

const productSchema = Schema({
  name: {
    type: String,
    unique: true,
    required: [
      true,
      'Role is required.'
    ]
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    default: 0
  },
  available: {
    type: Boolean,
    default: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: Boolean,
    default: true,
    required: true
  },
})

productSchema.methods.toJSON = function() {
  const { __v, ...data } = this.toObject()
  return data;
}

module.exports = model('Product', productSchema)