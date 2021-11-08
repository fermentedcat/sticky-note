const app = require('./app.js')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 8000
const URI = process.env.DB_URI

mongoose.connect(URI, {
  dbName: process.env.DB_NAME,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'Connection error:'))
db.once('open', () => {
  console.log('Connected to MongoDB')
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
