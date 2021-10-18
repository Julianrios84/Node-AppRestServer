const { Router } = require("express");
const router = Router();

const {
  validateSignIn,
  validGoogle,
} = require("../validator/auth.validator");

const { signIn, signInGoogle } = require("../controllers/auth.controller");

router.post("/signin", [validateSignIn], signIn);

router.post("/google", [validGoogle], signInGoogle);

module.exports = router;
