const { check } = require("express-validator");
const { validator, existsCategoryID } = require("../helpers");

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
