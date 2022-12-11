const jwt = require('jsonwebtoken')
const config = require('config')
const user = require('../models/User')

// authenticating jsonWebToken
const auth = (req, res, next) => {
  // Validating token
  const token = req.header('x-auth-token')
  if (!token) {
    return res.status(400).json({ errors: ['No token, authorization denied'] })
  }
  try {
    // decoding payload
    const decode = jwt.verify(token, config.get('jwtSecret'))
    req.user = decode
    next()
  } catch (err) {
    return res.status(401).json({ errors: ['No token, authorization denied'] })
  }
}

module.exports = auth
