const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clickSchema = new Schema({
  clickedUrl: {type: String},
  clickedAt: {type: Date, default: Date.now},
  subscriber: {type: mongoose.Types.ObjectId, ref: 'Subscriber' },
  message: {type: mongoose.Types.ObjectId, ref: 'Message' },
}, {collection: 'Clicks'})

const Click = mongoose.model('Click', clickSchema)

module.exports = Click
