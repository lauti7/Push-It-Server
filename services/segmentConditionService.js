const SegmentCondition = require('../models/segmentCondition')

exports.createConditions = (segmentId, conditions) => {
  let newConditions = conditions.map(c => ({...c, segmentId}))
  SegmentCondition.insertMany(newConditions, (err, docs) => {
    if (err) {
      return null
    }

    return docs
  })
}

exports.findConditions = async segments => {
  let condition = segments.map(s => ({segmentId: s}))
  console.log(condition);
  const conditions = await SegmentCondition.find({$or: [...condition]}).catch(e => console.log(e))
  console.log(conditions);
  if (!conditions) {
    return null
  }

  return conditions

}
