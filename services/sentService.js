const Sent = require('../models/Sent')

const logSent = async (data) => {
  const sent = await Sent.create({data}).catch(e => console.log(e))

  if (!sent) {
    return null;
  }

  return sent

}
