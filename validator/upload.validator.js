const { check } = require("express-validator");
const { allowCollection } = require("../helpers");
const { validator } = require('../middlewares')

const validID = [
  check("id")
    .isMongoId()
    .withMessage("the ID is not valid"),
  (req, res, next) => {
    validator(req, res, next);
  },
];


const validCollection = [
  check("collection")
    .custom(c => allowCollection(c , ["user", "product"])),
  (req, res, next) => {
    validator(req, res, next);
  },
];



module.exports = { validID, validCollection };
