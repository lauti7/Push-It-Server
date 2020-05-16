const Segment = require('../services/segmentService')

const create = async (req, res) => {
  const appId = req.params.appId
  const segment = req.body
  const newAppSegment = await Segment.create({...segment, match: 'and'}, appId)
  
  if (!newAppSegment) {
    return res.status(500).json({success: false})
  }

  return res.status(200).json({success: true, newAppSegment})
}

const appSegments = async (req, res) => {
  const appId = req.params.appId
  const segments = await Segment.getAppSegments(appId)

  if (!segments) {
    return res.status(500).json({success: false})
  }

  return res.status(200).json({success: true, segments})
}

module.exports = {
  create,
  appSegments
}
