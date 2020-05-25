const dotenv = require('dotenv')
dotenv.config()
const cron = require('node-cron');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors')
const path = require('path')
const subscriberRoutes = require('./routes/subscribers')
const applicationRoutes = require('./routes/applications')
const messageRoutes = require('./routes/messages')
const userRoutes = require('./routes/users')
const segmentRoutes = require('./routes/segments')
const clickRoutes = require('./routes/clicks')
const Message = require('./services/messageService')


app.use(express.static(path.join(__dirname, 'assets')))
app.use('/assets',express.static(path.join(__dirname, 'assets')))


mongoose.connect('mongodb://localhost/pushit',  { useNewUrlParser: true,  useFindAndModify: false },  (err) => {
  console.log(err);
  console.log('Connect to DB');
})

cron.schedule("* * * * *", () => {
  console.log('Run every minute');
  Message.checkScheduleMessages()
})


const options = {
  origin: '*'
}
app.use(cors(options))
app.use(express.json())

app.use('/api/subscribers', subscriberRoutes)
app.use('/api/applications', applicationRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/users', userRoutes)
app.use('/api/segments', segmentRoutes)
app.use('/api/clicks', clickRoutes)



app.listen(8000, () => {
  console.log('Server Up');
})
