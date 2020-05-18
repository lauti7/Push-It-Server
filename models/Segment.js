const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const segmentSchema = new Schema({
  name: {type: String},
  appId: {type: mongoose.Types.ObjectId, ref: 'Application'},
  condition: {type: Array},
  count: {type: Number},
  status: {type: String, default: 'enable'},
  updatedAt: {type: Date, default: Date.now}
}, {collection: 'Segments'})

const Segment = mongoose.model('Segment', segmentSchema)

module.exports = Segment
