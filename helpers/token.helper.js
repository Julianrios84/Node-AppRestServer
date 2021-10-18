const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library')

const generateToken = (uid = '') => {
  return new Promise((resolve, reject) => {
    const payload = { uid }

    jwt.sign(payload, process.env.SECRETJWT, {
      expiresIn: '4h'
    }, (err, token) => {
      if(err) {
        console.log(err)
        reject('the token could not be generated')
      }else {
        resolve(token)
      }

    })
  })
}

const verifyToken = async (token) => {
  try {
    return jwt.verify(token, process.env.SECRETJWT, (err, response) => {
      if(err) {
        return null;
      }
      return response;
    });
  } catch (e) {
    return null;
  }
};

const verifyTokenGoogle = async (token = '') => {
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const { name, picture, email } = ticket.getPayload();
  return {
    name, picture, email
  }
}


module.exports = {
  generateToken, verifyToken, verifyTokenGoogle
}