const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const segmentConditionSchema = new Schema({
  segmentId: {type: mongoose.Types.ObjectId, ref: 'Segment'},
  field: {type: String},
  operator: {type: String},
  value: {type: String},
  type: {type: String},
}, {collection: 'SegmentConditions'})

const SegmentCondition = mongoose.model('SegmentCondition', segmentConditionSchema)

module.exports = SegmentCondition
