const dotenv = require('dotenv')
dotenv.config()
const cron = require('node-cron');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors')
const path = require('path')
const subscribersRoutes = require('./routes/subscribers')
const applicationsRoutes = require('./routes/applications')
const messagesRoutes = require('./routes/messages')
const usersRoutes = require('./routes/users')
const segmentsRoutes = require('./routes/segments')
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

app.use('/api/subscribers', subscribersRoutes)
app.use('/api/applications', applicationsRoutes)
app.use('/api/messages', messagesRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/segments', segmentsRoutes)


app.listen(8000, () => {
  console.log('Server Up');
})
