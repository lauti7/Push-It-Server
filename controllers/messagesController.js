const Message = require('../services/messageService')


const messages = async (req, res ) => {
  const showDraft = JSON.parse(req.query.showDraft)
  const _id = req.params._id

  const messages = await Message.getMessages(showDraft, _id)

  if (!messages) {
    return res.status(500).json({success: false, messages})
  }


  return res.status(200).json({success: true, messages})
}


const create = (req, res) => {
  const message = req.body.message

  const newMessage = Message.create(message)

  if (!newMessage) {
    return res.status(500).json({success: false})
  }

  return res.status(200).json({success: true, newMessage})

}

const sentMessages = async (req, res) => {
  const appId = req.params._id
  const messages = await  Message.getSentMessages(appId)

  if (!messages) {
    return res.status(500).json({success:false})
  }

  return res.status(200).json({success: true, messages});
}

const scheduleMessages = async (req, res) => {
  const appId = req.params._id
  const messages = await Message.getScheduleMessages(appId)

  if (!messages) {
    return res.status(500).json({success: false})
  }

  return res.status(200).json({success: true, messages});
}

const manuallySend = async (req, res) => {
  const {msgid} = req.body

  await Message.manuallySend(msgid)

  return res.status(200).json({success: true})

}



module.exports = {create, messages, manuallySend, sentMessages, scheduleMessages}
