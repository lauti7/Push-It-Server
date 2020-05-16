const Segment = require('../models/Segment')
const SegmentCondition = require('./segmentConditionService')
const Subscriber = require('./subscriberService')
const moment = require('moment')

exports.create = async ({name, conditions, match}, appId) => {

  const segment =  await Segment.create({name,match, appId}).catch(e => console.log(e))
  if (!segment) {
    return null
  }
  if (conditions.length > 0) {
    const newConditions = await SegmentCondition.createConditions(segment._id, conditions)
  }

  return segment
}

exports.getAppSegments = async appId => {
  const segments = await Segment.find({appId}).catch(e => console.log(e))

  if (!segments) {
    return null;
  }

  return segments
}

exports.getSegemt = async _id => {
  const segment = await Segment.findById({_id}).catch(e => console.log(e))

  if (!segment) {
    return null
  }

  return segment
}

const getConditions = async segments => {
  const segmentsConditions = await SegmentCondition.findConditions(segments)
  if (!segmentsConditions) {
    return null
  }

  return segmentsConditions
}

exports.getSubscribers = async segments => {
  const segmentsConditions = await getConditions(segments)
  console.log(segmentsConditions);

  if (!segmentsConditions) {
    return null
  }

  let conditions = {$and: []}

  segmentsConditions.forEach(condition => {
    if (condition.field) {
      let field = condition.field
      switch (condition.operator) {
        case 'eq':
          let equal = {[field]: {$eq: condition.value}}
          conditions.$and.push(equal)
          break;
        case 'ne':
          let notEqual = {[field]: {$ne: condition.value}}
          conditions.$and.push(notEqual)
          break
        case 'lte':
          if (condition.type === 'date') {
            let value = parseInt(condition.value)
            const day = moment().utc().subtract(value, 'days').format()
            console.log(day);
            let date = {[field]: {$lte: day}}
            conditions.$and.push(date)
          } else {
            let value = parseInt(condition.value)
            let number = {[field]: {$lte: value}}
            conditions.$and.push(number)
          }
          break
        case 'gte':
          if (condition.type === 'date') {
            let value = parseInt(condition.value)
            const day = moment().utc().subtract(value, 'days').format()
            console.log(day);
            let date = {[field]: {$gte: day}}
            conditions.$and.push(date)
          } else {
            let value = parseInt(condition.value)
            let number = {[field]: {$lte: value}}
            conditions.$and.push(number)
          }
          break
        default:
          console.log('Error');
          break
      }
    }
  })

  console.log(conditions);

  const subscribers = await Subscriber.getSubscriberMessage(conditions)

  if (!subscribers) {
    return null
  }

  return subscribers

}
