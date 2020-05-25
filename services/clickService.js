const Click = require('../models/Click')

const create = async click => {

  const newClick = await Click.create({
    clickedUrl: click.clickedUrl,
    message: click.messageId,
    subscriber: click.subscriberId
  }).catch(e => console.log(e));

  if (!newClick) {
    return false;
  }

  return newClick;

}

const getLogClicks = async (message) => {
  const clicks = await Click.find({message}).populate('subscriber').exec().catch(e => console.log(e));

  // console.log(clicks === undefined);

  if (!clicks) {
    return null;
  }

  return clicks
}

module.exports = {
  create,
  getLogClicks
}
