const webpush = require('web-push')

const PUBLIC_VAPID_KEY = 'BDdrQ-nQNed2Bc9CXNLJyPAZXkKxgF5LMzfJaTbt139P9IwAcpwVkBKUUGZkSwPpVqOqX6lV1CIct3TFssf03C4'
const PRIVATE_VAPID_KEY = 'kPAMQYe7P38-BOFCno3A9tkD9Z0ODLvCO8VmveAlHUk'

webpush.setVapidDetails('mailto:test@test', PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY)

module.exports = webpush
