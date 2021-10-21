const { validationResult } = require('express-validator');

const validator = (req, res, next) => {
  try {
      validationResult(req).throw()
      return next()
  } catch (err) {
      res.status(403)
      res.send({ errors: err.array({ onlyFirstError: true }) })
  }
}

const validFieldArchive = (req, res, next) => {
  if(!req.files || Object.keys(req.files).length === 0 || !req.files.archive) {
    return res.status(400).json({
      message: 'No files were uploaded.'
    })
  }
  next()
}


module.exports = {
  validator, validFieldArchive
}