const Subscriber = require('../models/Subscriber')
var LookIP = require('lookip')
const lookip = new LookIP()

exports.create = async ({subscription, os, device, appId, country, browser, lang, lastSession, subscriberId}) => {
  const subscriber = await Subscriber.create({
    country,
    subscriberId,
    subscription,
    os,
    device,
    browser,
    lang,
    lastSession,
    sessions: [lastSession],
    appId,
    sessionsCount: 1
  })
  .catch(e => {
    console.log(e);
  })

  if (!subscriber) {
    return false
  }

  return true
}

exports.getSubscribers = async appId => {
  const subscribers = await Subscriber.find({appId}).catch((err) => console.log(err))


  if (!subscribers) {
    return null
  }

  return subscribers
}


exports.updateLastSession = async ({lastSession, subscriberId}) => {
  const updateSub = await Subscriber.updateOne({subscriberId}, {$set: {lastSession}, $push: {sessions: lastSession}, $inc: {sessionsCount: 1}}).catch(e => console.log(e))
  if (!updateSub) {
    return null;
  }

  return updateSub
}

exports.unsubscribe = async subscriberId => {
  const updateSub = await Subscriber.updateOne({subscriberId}, {$set: {status: 'unsubscribed'}}).catch(e => console.log(e))

  if (!updateSub) {
    return null
  }

  return updateSub
}

exports.getSubOSs = async appId => {

  const os = await Subscriber.find({appId}).distinct('os').catch(e => console.log(e))

  if (!os) {
    return null;
  }

  return os

}


exports.subscribedUsersCount = async appId => {
  const subscribedUsers = await Subscriber.find({$and: [{status: 'subscribed'}, {appId: _id}]}).count().catch(e => console.log(e))

  if (!subscribedUsers) {
    return null;
  }

  return subscribedUsers

}

exports.totalSubscribers = async appId => {
  const totalSubscribers = await Subscriber.find({appId}).catch(e => console.log(e))

  if (!totalSubscribers) {
    return null
  }

  return totalSubscribers

}

exports.monthlyUsers = async appId => {
  return true
}


exports.getSubscriberMessage = async condition => {
  const subscribers = await Subscriber.find(condition).catch(e => console.log(e))

  if (!subscribers) {
    return null
  }

  return subscribers
}
