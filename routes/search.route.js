const { Router } = require("express");
const router = Router();
const { validAuth, isAdmin } = require("../middlewares");
const { validID, validateCreate, validateUpdate } = require('../validator/product.validator')
const { search } = require('../controllers/search.controller')

router.get('/:collection/:concept', [validAuth], search);



module.exports = router;