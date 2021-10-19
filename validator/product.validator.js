const { check } = require("express-validator");
const { validator, existsProductID, existsCategoryID } = require("../helpers");

const validID = [
  check("id")
    .isMongoId()
    .withMessage("the ID is not valid")
    .custom(existsProductID),
  (req, res, next) => {
    validator(req, res, next);
  },
];

const validateCreate = [
  check("name")
    .exists()
    .withMessage('the name does not exist')
    .not().isEmpty()
    .withMessage("the name is required"),
  check("category")
    .isMongoId()
    .withMessage("the ID is not valid")
    .not()
    .isEmpty()
    .withMessage("the category is required")
    .custom(existsCategoryID),
  (req, res, next) => {
    validator(req, res, next);
  },
];

const validateUpdate = [
  check("name")
    .optional()
    .not().isEmpty()
    .withMessage("the name is required"),
  check("category")
    .optional()
    .isMongoId()
    .withMessage("the ID is not valid")
    .not()
    .isEmpty()
    .withMessage("the name is required")
    .custom(existsCategoryID),
  (req, res, next) => {
    validator(req, res, next);
  },
];

module.exports = { validateCreate, validateUpdate, validID };
