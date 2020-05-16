const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const segmentSchema = new Schema({
  name: {type: String},
  appId: {type: mongoose.Types.ObjectId, ref: 'Application'},
  match: {type: String},
  count: {type: Number},
}, {collection: 'Segments'})

const Segment = mongoose.model('Segment', segmentSchema)

module.exports = Segment
