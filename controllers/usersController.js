const User = require('../services/userService')
const TokenHelper = require('../utils/token')
const bcrypt = require('bcryptjs')


const register = async (req, res) => {
  const user = await User.register(req.body)

  if (user === null) {
    return res.status(500).json({success: false})
  }

  if (user === false) {
    return res.status(200).json({success: false, message: 'Email already exists'})
  }

  const token = await TokenHelper.createUserToken(user._id)

  return res.status(200).json({success: true, token})
}

const login = async (req, res) => {
  const {email, password} = req.body
  const user = await User.getUser(email)
  console.log(user);
  if (user) {
    const comparePassword = await bcrypt.compare(password, user.password)
    if (comparePassword) {
      const token = await TokenHelper.createUserToken(user._id)
      return res.status(200).json({success: true, token})
    } else {
      return res.status(500).json({success: false, message: 'Wrong Password'})
    }
  }

  return res.status(500).json({success: false, message: 'Email is  not registered'})


}



module.exports = {
  register,
  login
}
