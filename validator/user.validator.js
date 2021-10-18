const { check } = require('express-validator')
const { isRoleValidate, existsEmail, existsID } = require('../helpers/dbvalidators.helper')
const { validator } = require('../helpers/validator.helper')

const validateCreate = [
  check('name', 'the name is required')
    .not().isEmpty(),
  check('email')
    .isEmail().withMessage('the email is not valid')
    .custom(existsEmail),
  check('password')
    .not().isEmpty().withMessage('the name is required')
    .isLength({ min: 6}).withMessage('the password must be greater than or equal to 6 characters'),
  check('role')
    .custom(isRoleValidate),
  (req, res, next) => {
    validator(req, res, next)
  }
]

const validateUpdate = [
  check('id')
    .isMongoId().withMessage('the ID is not valid')
    .custom(existsID),
  check('name')
    .optional()
    .not().isEmpty().withMessage('the name is required'),
  check('email')
    .optional()
    .isEmail().withMessage('the email is not valid')
    .custom(existsEmail),
  check('password')
    .optional()
    .not().isEmpty().withMessage('the name is required')
    .isLength({ min: 6}).withMessage('the password must be greater than or equal to 6 characters'),
  check('role')
    .optional()
    .custom(isRoleValidate),
  (req, res, next) => {
    validator(req, res, next)
  }
]


const validateRemove = [
  check('id')
    .isMongoId().withMessage('the ID is not valid')
    .custom(existsID),
  (req, res, next) => {
    validator(req, res, next)
  }
]

module.exports = { validateCreate, validateUpdate, validateRemove }