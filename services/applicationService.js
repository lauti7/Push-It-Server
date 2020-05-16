const Application = require('../models/Application')
const Subscriber = require('../services/subscriberService')
const moment = require('moment')


const getTotalSubscribers = async _id => {
  const subs = await Subscriber.totalSubscribers(_id)

  if (!subs) {
    return null
  }

  return subs
}



exports.create = async (data, user) => {
  const application = await Application.create({
    name: data.name,
    siteName: data.siteName,
    siteUrl: data.siteUrl,
    userId,
    welcomeNotification: data.welcomeNotification,
  })
  .catch(e => {
    console.log(e);
  })

  if (!application) {
    return null
  }
  return application
}

exports.getApp = async (_id) => {

  const application = await Application.findById({_id}).catch(e => console.log(e))

  if (!application) {
    return null;
  }

  const totalSubscribers = await getTotalSubscribers(_id)
  console.log(totalSubscribers.length);

  const subscribedSub = [...totalSubscribers].filter(sub => sub.status === 'subscribed').length
  const monthlyActiveSubs = [...totalSubscribers].filter(sub => {
    const currentMonth = moment().month()
    const lastSessionMonth = moment(sub.lastSession).month()
    if (currentMonth === lastSessionMonth) {
      return sub
    }
  }).length

  return ({
    ...application._doc,
    totalSubscribers: totalSubscribers.length,
    subscribedSub,
    monthlyActive: monthlyActiveSubs
  })
}

exports.getAuthApps = async userId => {
  const userApplications = await Application.find({userId: userId}).catch(e => console.log(e))

  if (!userApplications) {
    return null;
  }


  return userApplications
}
