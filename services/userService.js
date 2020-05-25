const User = require('../models/User')
const Application = require('../models/Application')
const bcrypt = require('bcryptjs')


const checkIfExisted = async email => {
  const existedUser = await getUser(email)
  console.log('Existed User', existedUser);
  if (existedUser) {
    console.log('Existed');
    return true
  }

  return false
}


const register = async (data) => {
  const {email, firstName, lastName, password} = data
  const checkEmail = await checkIfExisted(email)
  if (checkEmail) {
    return false
  }
  const hashedPassword = bcrypt.hashSync(password)
  const user = await User.create({email, firstName, lastName, password: hashedPassword}).catch(e => console.log(e))
  if (!user) {
    return null
  }

  return user
}


const getUser = async email => {
  const user = await User.findOne({email}).catch(e => console.log(e))

  if (!user) {
    return null
  }

  return user
}



module.exports = {
  checkIfExisted,
  register,
  getUser
}
