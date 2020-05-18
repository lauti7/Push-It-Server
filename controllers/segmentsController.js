const Segment = require('../services/segmentService')

const create = async (req, res) => {
  const appId = req.params.appId
  const segment = req.body
  const newAppSegment = await Segment.create({...segment}, appId)

  if (!newAppSegment) {
    return res.status(500).json({success: false})
  }

  return res.status(200).json({success: true, newAppSegment})
}

const appSegments = async (req, res) => {
  const appId = req.params.appId
  const segments = await Segment.getAppSegments(appId)

  console.log('SEGMENTS', segments);
  if (!segments) {
    return res.status(500).json({success: false})
  }

  return res.status(200).json({success: true, segments})
}

const show = async (req, res) =>  {
  const _id = req.params._id
  const segment = await Segment.getSegemt(_id)

  if (!segment) {
    return res.status(500).json({success: false})
  }

  return res.status(200).json({success: true, segment})
}

const subscribers = async (req, res) => {
  const _id = req.params._id

  const subscribers = await Segment.getSubscribers(_id)

  if (!subscribers) {
    return res.status(500).json({success: false})
  }

  return res.status(200).json({success: true, subscribers})

}

const changeStatus = async (req, res) => {
  const _id = req.params._id
  const status = req.query.status

  const updateSegment = await Segment.changeStatus(_id, status)

  if (!updateSegment) {
    return res.status(500).json({success: false})
  }

  return res.status(200).json({success: true, segment: updateSegment})

}

module.exports = {
  create,
  appSegments,
  show,
  subscribers,
  changeStatus
}
