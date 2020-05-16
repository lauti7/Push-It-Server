const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {type: String, required: true},
  password: {type: String, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  signUpDate: {type: Date, default: Date.now}
}, {collection: 'Users'})

const User = mongoose.model('User', userSchema)

module.exports = User
