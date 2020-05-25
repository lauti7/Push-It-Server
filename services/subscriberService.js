const Subscriber = require('../models/Subscriber')

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
    app:appId,
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

exports.getSubscribers = async app => {
  const subscribers = await Subscriber.find({app}).catch((err) => console.log(err))


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

exports.getSubOSs = async app => {

  const os = await Subscriber.find({app}).distinct('os').catch(e => console.log(e))

  if (!os) {
    return null;
  }

  return os

}


exports.getSubscriberMessage = async condition => {
  const subscribers = await Subscriber.find(condition).catch(e => console.log(e))

  if (!subscribers) {
    return null
  }

  return subscribers
}

exports.getSegmentSubscribers = async condition => {
  const subscribers = await Subscriber.find(condition).catch(e => console.log(e))

  if (!subscribers) {
    return null
  }

  return subscribers
}
