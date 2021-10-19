const bcrypt = require('bcryptjs');
const { User }  = require('../models');


const getall = async (req, res) => {

  const { limit = 5, skip = 0 } = req.query;

  const [total, users] = await Promise.all([
    User.countDocuments({ status: true}),
    User.find({ status: true}).skip(Number(skip)).limit(Number(limit))
  ])
  res.json({
    total,
    users
  })
}

const create = async (req, res) => {

  const { name, email, password, role} = req.body
  const user = new User({
    name, email, password, role
  })  

  // Encrypt password
  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(password, salt);

  // Save database
  user.save();

  res.json({
    user
  })
}

const update = async (req, res) => {

  const { id } = req.params;
  const { password, google, email, ...data} = req.body

  // Validate with database
  if(password) {
    // Encrypt password
    const salt = bcrypt.genSaltSync(10);
    data.password = bcrypt.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, data, { new: true });

  res.json({
    user
  })
}

const remove = async (req, res) => {

  const { id } = req.params;
  // const user = await User.findByIdAndDelete(id)
  const user = await User.findByIdAndUpdate(id, { status: false }, { new: true });
  res.json({
    user
  })
}

module.exports = { getall, create, update, remove }