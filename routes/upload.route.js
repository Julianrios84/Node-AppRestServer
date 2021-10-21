const { Router } = require("express");
const router = Router();
const { validAuth, validFieldArchive } = require("../middlewares");
const { validID, validCollection } = require('../validator/upload.validator')
const { uploadFile, updateImage, viewImage, updateImageCloudinary } = require("../controllers/upload.controller");


router.post('/', [validAuth, validFieldArchive], uploadFile)

router.put('/:collection/:id', [validAuth, validFieldArchive, validID, validCollection], updateImageCloudinary)

router.get('/:collection/:id', [validAuth, validID, validCollection], viewImage)

module.exports = router;
