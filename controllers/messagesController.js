const Message = require('../services/messageService')


const messages = async (req, res ) => {
  const showDraft = JSON.parse(req.query.showDraft)
  const _id = req.params.appId

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
  const appId = req.params.appId
  const sent = await  Message.getSentMessages(appId)
  // console.log('clickcontroller::', messages);
  const messages = sent.map(msg => {
    return ({
      _id: msg._id,
      name: msg.name,
      subscribersCount: msg.subscribersCount,
      sendAt: msg.sendAt,
      clicks: msg.clicks
    })
  })
  console.log(messages[0]);

  if (!messages) {
    return res.status(500).json({success:false})
  }

  return res.status(200).json({success: true, messages});
}

const scheduleMessages = async (req, res) => {
  const appId = req.params.appId
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

const getMessage = async (req, res) => {
  const _id = req.params.messageId

  const message = await Message.getMessage(_id)

  if (!message) {
    return res.status(500).json({success: false, message: 'Error on getting this message. Maybe an error or message does not exists any more'})
  }

  return res.status(200).json({success: true, message})
}



module.exports = {create, messages, manuallySend, sentMessages, scheduleMessages, getMessage}
