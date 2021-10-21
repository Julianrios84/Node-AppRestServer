const { check } = require('express-validator')
const { validator } = require('../middlewares')

const validateSignIn = [
  check('email')
    .exists()
      .withMessage('does not exist')
    .not().isEmpty()
      .withMessage("can't go empty.")
    .isEmail()
      .withMessage("does not comply with the format."),
  check('password')
    .exists()
      .withMessage("does not exist.")
    .not().isEmpty()
      .withMessage("can't go empty."),
  (req, res, next) => {
    validator(req, res, next)
  }
]

const validGoogle = [
  check("id_token")
    .exists()
      .withMessage("does not exist.")
    .not().isEmpty()
      .withMessage("can't go empty."),
  (req, res, next) => {
    validator(req, res, next)
  }
]

module.exports = { validateSignIn, validGoogle }