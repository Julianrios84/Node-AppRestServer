const { check } = require("express-validator");
const { existsCategoryID } = require("../helpers");
const { validator } = require('../middlewares')

const validID = [
  check("id")
    .isMongoId()
    .withMessage("the ID is not valid")
    .custom(existsCategoryID),
  (req, res, next) => {
    validator(req, res, next);
  },
];

const validateCreate = [
  check("name").not().isEmpty().withMessage("the name is required"),
  (req, res, next) => {
    validator(req, res, next);
  },
];


const validateUpdate = [
  check("name").not().isEmpty().withMessage("the name is required"),
  (req, res, next) => {
    validator(req, res, next);
  },
];

module.exports = { validateCreate, validateUpdate ,validID };
