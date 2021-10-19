const { Router } = require("express");
const router = Router();
const { validAuth, isAdmin } = require("../middlewares");
const { validID, validateCreate, validateUpdate } = require('../validator/product.validator')
const { getall, getone, create, update, remove } = require('../controllers/product.controller')

router.get('/', [validAuth], getall);

router.get('/:id', [validAuth, validID], getone);

router.post('/', [validAuth, validateCreate], create);

router.put('/:id', [validAuth, validID, validateUpdate], update);

router.delete('/:id', [validAuth, isAdmin, validID], remove);

module.exports = router;