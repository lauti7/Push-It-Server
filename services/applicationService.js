const Application = require('../models/Application')
const moment = require('moment')


exports.create = async (data, userId) => {
  const application = await Application.create({
    name: data.name,
    siteName: data.siteName,
    siteUrl: data.siteUrl,
    user: userId,
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

  const application = await Application.findById({_id}).populate('subscribers').catch(e => console.error('ERROR: ', e.message))

  console.log('APPLICATION SERVICE:', application);


  if (!application) {
    return null;
  }

  const totalSubscribers = application.subscribers
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

exports.getAuthApps = async user => {
  const userApplications = await Application.find({user}).catch(e => console.log(e))

  if (!userApplications) {
    return null;
  }


  return userApplications
}

exports.getAppSubscribers = async (_id) => {
  const app = Application.findById({_id}).populate('subscribers').exec().catch(e => console.log(e))

  if (!app) {
    return null
  }

  return app.subscribers
}
