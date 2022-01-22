require('dotenv').config()
 
const express = require('express')
const app = express()
const cors = require('cors')
 
const { errorHandler, no} = require('./utils/erros')

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('public'))
 
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.use(errorHandler)
app.use(notFoundHandler)

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
