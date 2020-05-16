const Subscriber = require('../services/subscriberService')

const subscribe = async (req, res) => {
  const subscriber  = req.body.subscriber
  const subscription = await Subscriber.create(subscriber)

  if (!subscription) {
    return res.status(500).json({success: false})
  }

  return res.status(201).json({success: true})
}

const updateLastSession = async (req, res) => {
  const subscriber = req.body.subscriber
  const updateSub = await Subscriber.updateLastSession(subscriber)
  if (!updateSub) {
    return res.status(500).json({success:false})
  }
  return res.status(200).json({message: 'Updated'})
}

const unsubscribe = async (req, res) => {
  const {subscriberId} = req.body
  const updateSub = await Subscriber.unsubscribe(subscriberId)

  if (!updateSub) {
    return res.status(500)
  }

  return res.status(200).json({message: 'Updated'});
}

const usersOs = async (req, res) => {
  const appId = req.params.appId
  const os = await Subscriber.getSubOSs(appId)

  if (!os) {
    return res.status(500).json({success: false})
  }

  return res.status(200).json({success: true, os})
}

const all = async (req, res) => {
  const appId = req.params.appId
  const subscribers = await Subscriber.getSubscribers(appId)

  if (!subscribers) {
    return res.status(500).json({success: false})
  }

  return res.status(200).json({success: true, subscribers})
}

module.exports = {
  subscribe,
  updateLastSession,
  unsubscribe,
  usersOs,
  all
}
