const { Category, Role, User, Product } = require('../models');

const isRoleValidate = async (role = '') => {
  const exists = await Role.findOne({role});
  if(!exists) {
    throw new Error(`${role} role is invalid`)
  }
}

const existsEmail = async (email = '') => {
  const exists = await User.findOne({email});
  if(exists) {
    throw new Error(`the ${email} email is already registered`)
  }
}

const existsID = async (id) => {
  const exists = await User.findById(id);
  if(!exists) {
    throw new Error(`the id ${id} does not exist`)
  }
}

const userIsActive = async (email = '') => {
  const isActive = await User.findOne({email, status: true});
  if(!isActive) {
    throw new Error(`the ${email} is inactive`)
  }
}

const existsCategoryID = async (id) => {
  const exists = await Category.findById(id);
  if(!exists) {
    throw new Error(`the id ${id} does not exist`)
  }
}

const existsProductID = async (id) => {
  const exists = await Product.findById(id);
  if(!exists) {
    throw new Error(`the id ${id} does not exist`)
  }
}



module.exports = {
  isRoleValidate, existsEmail, existsID, userIsActive, existsCategoryID, existsProductID
}