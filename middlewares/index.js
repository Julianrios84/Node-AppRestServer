const authMiddleware = require('../middlewares/auth.middleware')
const roleMiddleware = require('../middlewares/role.middleware')
const validationsMiddleware = require('../middlewares/validations.middleware')

module.exports= {
  ...authMiddleware,
  ...roleMiddleware,
  ...validationsMiddleware
}