const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  name: {type: String},
  sendToSubscribedUsers: {type: Boolean,  default: false},
  sendToSegments: {type:  Boolean, default: false},
  segments: {type: Array, default: null},
  status: {type: String},
  message: {type: Object},
  platforms: {type: Object},
  appId: {type: mongoose.Types.ObjectId, ref: 'Application'},
  sendAt: {type: Date},
  upToYou: {type: Boolean, default: false},
  optimization: {type: String},
  createdAt: {type: Date, default: Date.now}
}, {collection: 'Messages'})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message
