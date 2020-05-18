const Segment = require('../models/Segment')
const SegmentCondition = require('./segmentConditionService')
const Subscriber = require('./subscriberService')
const moment = require('moment')
const Promise = require('bluebird')

exports.create = async ({name, conditions}, appId) => {
  const segment =  await Segment.create({name, condition: [...conditions] , appId}).catch(e => console.log(e))
  if (!segment) {
    return null
  }
  const count = await getSegmentSubscribers(segment._id)
  console.log('COUNT', count);
  let length = count.length
  const updatedSegment = await Segment.findByIdAndUpdate({_id: segment._id}, {$set: {count: length}}).catch(e => console.log(e))
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

exports.getSubscribers = async _id => {
  const subs = await getSegmentSubscribers(_id)
  if (subs === null) {
    return null
  }
  let length = subs.length
  const segment = await Segment.findById({_id}).catch(e => console.log(e))
  const current = moment()
  const segmentTime = moment(segment.updatedAt)
  const diff = parseInt(current.diff(segmentTime, "minutes"))
  if (diff > 25) {
    await Segment.findByIdAndUpdate({_id: _id}, {$set: {count: length, updatedAt: Date.now()}}).catch(e => console.log(e))
  }
  return subs

}

const findConditions = async segments => {
  let condition = segments.map(s => ({_id: s}))
  console.log(condition);
  const conditions = await Segment.find({$or: [...condition]}).catch(e => console.log(e))
  console.log(conditions);
  if (!conditions) {
    return null
  }

  return conditions

}

const getConditions = async segments => {
  const segmentsConditions = await getSegmentsConditions(segments)

  if (!segmentsConditions) {
    return null
  }

  return segmentsConditions
}

exports.getSegmentsSubscribers = async segments => {
  console.log('segments: ', segments);
  const segmentsConditions = await findConditions(segments)
  console.log('Segments Conditions: ', segmentsConditions);

  if (!segmentsConditions) {
    return null
  }

  let query = null
  let withOr = false
  let withAnd = false
  segmentsConditions.forEach(c => {
    console.log('C.CONDITION', c.condition);
    if (c.condition.length > 1) {
      console.log('OR');
      query = {$or:[]}
      withOr = true
    } else {
      if (segmentsConditions.length === 1) {
        query = {}
      } else {
        query = {$and: []}
        withAnd = true

      }
    }
    c.condition.forEach(con => {
      let currentQuery = {$and: []}
      con.forEach(condition => {
        if (condition.field) {
          let field = condition.field
          switch (condition.operator) {
            case 'eq':
              let equal = {[field]: {$eq: condition.value}}
              currentQuery.$and.push(equeal)
              break;
            case 'ne':
              let notEqual = {[field]: {$ne: condition.value}}
              currentQuery.$and.push(notEqual)

              break
            case 'lte':
              if (condition.type === 'date') {
                let value = parseInt(condition.value)
                const day = moment().utc().subtract(value, 'days').format()
                console.log(day);
                let date = {[field]: {$lte: day}}
                currentQuery.$and.push(date)
              } else {
                let value = parseInt(condition.value)
                let number = {[field]: {$lte: value}}
                currentQuery.$and.push(number)
              }
              break
            case 'gte':
              if (condition.type === 'date') {
                let value = parseInt(condition.value)
                const day = moment().utc().subtract(value, 'days').format()
                console.log(day);
                let date = {[field]: {$gte: day}}
                currentQuery.$and.push(date)
              } else {
                let value = parseInt(condition.value)
                let number = {[field]: {$lte: value}}
                currentQuery.$and.push(number)
              }
              break
            default:
              console.log('Error');
              break
          }
        }
      })
      if (withAnd) {
        query.$and.push(currentQuery)
      } else if(withOr) {
        query.$or.push(currentQuery)
      } else {
        query = currentQuery
      }
    })
  })

  console.log(query);

  const subscribers = await Subscriber.getSubscriberMessage({$and: [query]})
  if (!subscribers) {
    return null
  }

  return subscribers

}

// exports.updateCount = async (_id, subscribers) => {
//   const segmentUpdate = await Segment.findByIdAndUpdate({_id}, {$set: {count: subscribers.length}}).catch(e => console.log(e))
//
//   if (!segmentUpdate) {
//     return null
//   }
//
//   return true
// }

const getSegmentSubscribers = async id => {
  const segment = await Segment.findById({_id: id}).catch(e => console.log(e))

  if (!segment) {
    return null
  }

  let query = null
  let withOr = false
  let withAnd = false
  segment.condition.forEach(con => {
    console.log('C.CONDITION', con);
    if (con.length > 1) {
      console.log('OR');
      query = {$or:[]}
      withOr = true
    } else {
      query = {$and: []}
      withAnd = true
    }
    con.forEach(condition => {
      let currentQuery = {$and: []}
      if (condition.field) {
        let field = condition.field
        switch (condition.operator) {
          case 'eq':
            let equal = {[field]: {$eq: condition.value}}
            currentQuery.$and.push(equeal)
            break;
          case 'ne':
            let notEqual = {[field]: {$ne: condition.value}}
            currentQuery.$and.push(notEqual)

            break
          case 'lte':
            if (condition.type === 'date') {
              let value = parseInt(condition.value)
              const day = moment().utc().subtract(value, 'days').format()
              console.log(day);
              let date = {[field]: {$lte: day}}
              currentQuery.$and.push(date)
            } else {
              let value = parseInt(condition.value)
              let number = {[field]: {$lte: value}}
              currentQuery.$and.push(number)
            }
            break
          case 'gte':
            if (condition.type === 'date') {
              let value = parseInt(condition.value)
              const day = moment().utc().subtract(value, 'days').format()
              console.log(day);
              let date = {[field]: {$gte: day}}
              currentQuery.$and.push(date)
            } else {
              let value = parseInt(condition.value)
              let number = {[field]: {$lte: value}}
              currentQuery.$and.push(number)
            }
            break
          default:
            console.log('Error');
            break
        }
      }
      if (withAnd) {
        query.$and.push(currentQuery)
      } else {
        query.$or.push(currentQuery)
      }
    })
  })

  console.log(query);

  const subscribers = await Subscriber.getSegmentSubscribers(query)

  if (!subscribers) {
    return null
  }

  return subscribers

}

exports.changeStatus = async (_id, status) => {

  let newStatus = ''

  if (status === 'true') {
    newStatus = 'enable'
  } else {
    newStatus = 'disable'
  }

  const segment = await Segment.findByIdAndUpdate({_id}, {$set: {status: newStatus}}, {new: true}).catch(e => console.log(e))

  if (!segment) {
    return null
  }

  return segment

}
