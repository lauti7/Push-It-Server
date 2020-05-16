const jwt = require('jsonwebtoken')

module.exports = function (req, res, next){
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  jwt.verify(token, process.env.USER_TOKEN, (err, decoded) => {
    console.log('err', err)
    console.log('decode', decoded)
    if (err) {
      return res.status(403).json({
        suceess: false,
        error: 'Invalid token'
      })
    } else {
      req.user = decoded
      next()
    }
  })
}
