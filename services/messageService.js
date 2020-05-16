const Message = require('../models/Message')
const Segment = require('./segmentService')
const WebpushHelper = require('../utils/webpush')


var STATUS_SENT = 'sent'
var STATUS_RUNING = 'running'
var STATUS_SCHEDULE = 'schedule'
var STATUS_DRAFT = 'draft'

exports.getMessages = async (showDraft, appId) => {
  if (showDraft) {
    const messages = await Message.find({$and: [{appId}, {status: STATUS_DRAFT}]}).catch(e => console.log(e))
  }
  const messages = await Message.find({appId}).catch(e => console.log(e))


  if (!messages) {
    return null
  }

  return messages
}

exports.create = message => {
  let newMessage = new  Message;
  newMessage.name = message.name
  if (message.afterCreation) {
    newMessage.sendAt = Date.now()
  } else if (message.atParticularTime){
    newMessage.status = STATUS_SCHEDULE
    newMessage.sendAt = message.scheduleDate
  } else if (message.upToYou) {
    newMessage.upToYou = true;
  }

  if (message.defaultWay) {
    newMessage.optimization = 'default'
  } else if(message.intelligentWay) {
    newMessage.optimization = 'smart'
  }

  newMessage.message = message.message
  newMessage.appId = message.appId
  if (message.draft) {
    newMessage.draft = STATUS_DRAFT
  }
  if (message.sendToSubscribedUsers) {
    newMessage.sendToSubscribedUsers = message.sendToSubscribedUsers
  }

  if (message.sendToSegments) {
    newMessage.sendToSegments = message.sendToSegments
  }


  if (newMessage.sendToSegments) {
    if (message.selectedSegments.length > 0) {
      message.selectedSegments.forEach(segment => {
        newMessage.segments.push(segment)
      })
    }
  }

  newMessage.save(err => {
    if (err) {
      console.log(err);
      return null;
    }
  })
  return newMessage

}


exports.getSentMessages = async appId => {
  const sentMessages = await Message.find({$and:[{status: STATUS_SENT}, {appId}]}).catch(e => console.log(e))

  if (!sentMessages) {
    return null;
  }

  return sentMessages
}


exports.getScheduleMessages = async appId => {
  const scheduleMsgs = await Message.find({$and:[{status: STATUS_SCHEDULE}, {appId}]}).catch(e => console.log(e))

  if (!scheduleMsgs) {
    return null;
  }

  return scheduleMsgs


}

exports.manuallySend = async _id => {

  // TODO: Create Send LOG
  const message = await Message.findById(_id).catch(e => console.log(e))
  if (message) {
    const payload = JSON.stringify(message.message)
    const subscribers = await Subscriber.getSubscribers(message.appId)
    if (!subscribers) {
      return false;
    }
    subscribers.forEach(subscriber => {
      WebpushHelper.sendNotification(subscriber.subscription, payload).catch(e => console.error(e))
    });

  }

  return false;

}


exports.checkScheduleMessages = async() => {
  const now = new Date();
  console.log(now);
  const scheduleMessages = await Message.find({$and: [{status: STATUS_SCHEDULE},  {sendAt: {$lte: now}}]}).catch(e => console.log(e))
  if (scheduleMessages.length > 0) {
    console.log('Messages to send');
    // const update = await Message.updateMany({$and: [{status: STATUS_SCHEDULE},  {sendAt: {$lte: now}}]}, {$set: {status: STATUS_SENT}}).catch(e => console.log(e));
    // console.log(update.nModified);
    //Queue and Jobs
    scheduleMessages.forEach(async (msg) => {
      const payload = JSON.stringify(msg.message)
      if (msg.segments.length > 0) {
        const subscribers = await Segment.getSubscribers(msg.segments)
        console.log(subscribers);
        // subscribers.forEach(subscriber => {
        //   WebpushHelper.sendNotification(subscriber.subscription, payload).catch(e => console.error(e))
        // });
      }

    })
  } else {
    console.log('Doesnt find');
  }

}

exports.run = async _id => {
  const message = await Message.updateOne({_id}, {$set:{status: STATUS_RUNING}}).catch(e => console.log(e))

  if (!message) {
    throw Error('Error on updating')
  }

  return true
}

exports.sent = async _id => {
  const message = await Message.updateOne({_id}, {$set:{status: STATUS_RUNING}}).catch(e => console.log(e))

  if (!message) {
    throw Error('Error on updating')
  }

  return true
}
