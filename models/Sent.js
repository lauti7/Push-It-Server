const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sendingSchema = new Schema({
  app: {type: mongoose.Types.ObjectId, ref: 'Application' },
  subscriber: {type: mongoose.Types.ObjectId, ref: 'Subscriber' },
  message: {type: mongoose.Types.ObjectId, ref: 'Message' },
  status: {type: String, default: 'processed'},
  createdAt: {type: Date, default: Date.now },
}, {collection: 'Sendings'})

const Sending = mongoose.model('Sending', sendingSchema)

module.exports = Sending
