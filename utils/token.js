const jwt = require('jsonwebtoken')


exports.createUserToken = async (id, key) => {
  const token = jwt.sign({_id: id}, process.env.USER_TOKEN)
  if (token) {
    return token
  }
}
