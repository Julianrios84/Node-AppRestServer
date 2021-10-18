const authMiddleware = require('../middlewares/auth.middleware')
const roleMiddleware = require('../middlewares/role.middleware')

module.exports= {
  ...authMiddleware,
  ...roleMiddleware
}