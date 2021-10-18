const { validationResult } = require('express-validator');

// const validator = (req, res, next) => {
//   const errors = validationResult(req)
//   if(!errors.isEmpty()){
//     return res.status(400).json(errors)
//   }
  
//   next();
// }

const validator = (req, res, next) => {
  try {
      validationResult(req).throw()
      return next()
  } catch (err) {
      res.status(403)
      res.send({ errors: err.array({ onlyFirstError: true }) })
  }
}

module.exports = {
  validator
}