const isAdmin = (req, res, next) => {

  if(!req.user) {
    return res.status(500).json({
      message: 'You want to verify the role without validating the token'
    })
  } 

  const { role, name } = req.user;
  if(role !== 'ADMIN') {
    return res.status(401).json({
      message: `${name} has no privileges`
    })
  }

  next();
}

const roleIn = (...roles ) => {
  return (req, res, next) => {

    if(!req.user) {
      return res.status(500).json({
        message: 'You want to verify the role without validating the token'
      })
    } 

    if(!roles.includes(req.user.role)) {
      return res.status(401).json({
        message: 'you have no privileges'
      })
    }


    next()
  }
}


module.exports = {
  isAdmin, roleIn
}