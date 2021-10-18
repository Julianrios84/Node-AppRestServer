const bcrypt = require('bcryptjs');
const { generateToken, verifyTokenGoogle } = require('../helpers/token.helper')
const User = require("../models/user.model")

const signIn = async (req, res) => {

  const { email, password } = req.body

  try {

    const user = await User.findOne({email})
    if(!user) {
      return res.status(400).json({
        message: 'username or password are invalid'
      })
    }

    if(user.status == false) {
      return res.status(400).json({
        message: 'username or password are invalid'
      })
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if(!validPassword) {
      return res.status(400).json({
        message: 'username or password are invalid'
      })
    }

    const token = await generateToken(user.id);

    res.json({
      user,
      token
    })
  } catch (error) {
    console.log(error)
    res.json({
      message: 'something went wrong'
    })
  }
}

const signInGoogle = async (req, res) => {
  
  try {
    const { id_token } = req.body
    const {name, picture, email} = await verifyTokenGoogle(id_token);

    let user = await User.findOne({ email })

    if(!user) {
      const data = {
        name, email, image: picture, password: ':P', google: true
      }
      user = new User(data)
      await user.save();
    }

    if(!user.status) {
      return res.status(401).json({
        message: 'User is blocked, please contact support'
      })
    }

    const token = await generateToken(user.id);

    res.json({
      user,
      token
    })
    
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      message: 'The token could not be verified'
    })
  }
}

module.exports = { signIn, signInGoogle }