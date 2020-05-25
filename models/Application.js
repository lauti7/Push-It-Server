const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const applicationSchema = new Schema({
  name: {type: String},
  siteName: {type: String},
  siteUrl: {type: String},
  welcomeNotification: {type: Object},
  user: {type: mongoose.Types.ObjectId, ref: 'User'}
}, {collection: 'Applications'})

applicationSchema.virtual('subscribers', {
  ref: 'Subscriber',
  localField: '_id',
  foreignField: 'appId',
})

applicationSchema.virtual('subscount', {
  ref: 'Subscriber',
  localField: '_id',
  foreignField: 'appId',
  count: true
})


const Application = mongoose.model('Application', applicationSchema)

module.exports = Application
