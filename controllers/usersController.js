const User = require('../services/userService')
const TokenHelper = require('../utils/token')

const register = async (req, res) => {
  const user = await User.register(req.body)

  if (!user) {
    return res.status(500).json({success: false})
  }

  const token = TokenHelper.createUserToken(user._id)

  return res.status(200).json({success: true, token})
}

const login = async (req, res) => {
  const {email, password} = req.body
  const user = User.getUser(email)
  if (user) {
    const comparePassword = await bcrypt.compare(password, user.password)
    if (comparePassword) {
      const token = TokenHelper.createUserToken(user._id)
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
