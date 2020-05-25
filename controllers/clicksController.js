const Click = require('../services/clickService')


const logClick = async (req, res) =>  {

  const click = req.body

  const newClick = await Click.create(click)
  console.log(newClick);

  if (!newClick) {
    return res.status(500).json({})
  }

  return res.status(200).json({newClick})

}


const getLogClicks = async (req, res) => {
  const messageId = req.params.messageId

  const messageClicks = await Click.getLogClicks(messageId)

  if (!messageClicks) {
    return res.status(500).json({success: false})
  }

  return res.status(200).json({success: true, clicks: messageClicks})
}


module.exports = {
  logClick,
  getLogClicks
}
