const Application = require('../services/applicationService')


const create = async (req, res) => {
  const userId = req.user._id
  const data = req.body;
  const application = await Application.create(data, userId)
  if (!application) {
    return res.status(500).json({success: false})
  }
  return res.status(200).json({success: true, application})
}

const show = async (req, res) => {
  const _id = req.params._id

  const application = await Application.getApp(_id)

  console.log('APPLICATION: ', application);

  if (!application) {
    return res.status(500).json({success: false})
  }

  return res.status(200).json({application, success: true})
}

const userApps = async (req, res) => {
  console.log('User Apps');
  const userId = req.user._id;
  const applications = await Application.getAuthApps(userId)
  if (!applications) {
    return res.status(500).json({success: false, applications})
  }
  return res.status(200).json({success: true, applications})
}



module.exports = {create, show, userApps}
