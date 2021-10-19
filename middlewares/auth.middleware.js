const { verifyToken } = require("../helpers");
const { User } = require("../models");

const validAuth = async (req, res, next) => {
  try {
    //TODO: authorization: Bearer <token>
    const auth = req.headers["authorization"];
    if(auth == undefined || auth == '' || !auth.includes('Bearer')) {
      return res.status(401).json({ message: "You do not have authorization"});
    }
    // ["Bearer", "<token>"]
    const token = auth.split(" ")[1];
    const { uid } = await verifyToken(token);
    if (uid) {
      const user = await User.findById(uid);
      if(!user) {
        return res.status(401).json({ message: "You do not have authorization"});
      }

      if(!user.status) {
        return res.status(401).json({ message: "You do not have authorization"});
      }
      req.user = user;
      next();
    } else {
      return res.status(401).json({ message: "You do not have authorization"});
    }
  } catch (e) {
    console.log(e);
    res.status(401).send({ error: "You do not have authorization!" });
  }
};

module.exports = {validAuth};
