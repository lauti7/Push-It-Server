const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const applicationSchema = new Schema({
  name: {type: String},
  siteName: {type: String},
  siteUrl: {type: String},
  welcomeNotification: {type: Object},
  userId: {type: mongoose.Types.ObjectId, ref: 'User'}
}, {collection: 'Applications'})

const Application = mongoose.model('Application', applicationSchema)

module.exports = Application
