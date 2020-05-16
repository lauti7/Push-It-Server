const User = require('../models/User')
const Application = require('../models/Application')
const bcrypt = require('bcryptjs')


const checkIfExisted = async email => {
  const existedUser = await User.findOne({email}).catch(e => console.log(e))
  if (existedUser) {
    return true;
  }
  return false;
}


exports.register = async (data) => {
  const {email, firstName, lastName, password} = data
  if (checkIfExisted(email)) {
    return res.status(400).json({success: false, message: 'User already exists'})
  }
  const hashedPassword = bcrypt.hashSync(password)
  const user = await User.create({email, firstName, lastName, password: hashedPassword}).catch(e => console.log(e))
  if (!user) {
    return null
  }

  return user
}

exports.getUser = async email => {
  const user = await User.findOne({email}).catch(e => console.log(e))

  if (!user) {
    return null
  }

  return user

}
