const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriberSchema = new Schema({
  country: {type: String},
  subscriberId: {type: String},
  subscription: {type: Object},
  device: {type: String},
  os: {type: String},
  optInDate: {type: Date, default: Date.now},
  status: {type: String, default: 'subscribed'},
  browser: {type: String},
  lang: {type: String},
  sessions: {type: Array},
  sessionsCount: {type: Number, default: 0},
  lastSession: {type: Date},
  appId: {type: mongoose.Types.ObjectId, ref: 'Application'},
}, {collection: 'Subscribers'})

const Subscriber = mongoose.model('Subscriber', subscriberSchema)

module.exports = Subscriber
