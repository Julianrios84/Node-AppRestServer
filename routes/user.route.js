const { Router } = require("express");
const router = Router();

const { validAuth, isAdmin, roleIn } = require("../middlewares");

const {
  validateCreate,
  validateUpdate,
  validateRemove,
} = require("../validator/user.validator");

const {
  getall,
  create,
  update,
  remove,
} = require("../controllers/user.controller");

router.get("/", [validAuth, roleIn("ADMIN", "USER")], getall);

router.post("/", [validateCreate], create);

router.put("/:id", [validateUpdate], update);

router.patch("/:id", [validateUpdate], update);

router.delete(
  "/:id",
  [validAuth, roleIn("ADMIN", "USER"), validateRemove],
  remove
);

module.exports = router;
