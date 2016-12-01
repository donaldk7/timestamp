var express = require('express')
var app = express()
var path = require('path')
var moment = require('moment')

app.use(express.static(path.join(__dirname, 'public')))

app.get('/:userInput', function (req, res) {
  var inputDate = req.params.userInput
  var output = formatDate(inputDate)
  
  res.send(output)
})

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

function formatDate(inDate) {
  var json = {}
  var day = undefined
  if(isNumber(inDate)) {   // check to see if input is purely number (i.e unix timestamp)
    day = moment.unix(inDate)
    json.unix = inDate
    json.natural = day.format('MMMM D, YYYY')
  } else {
    var convertedDate = inDate.replace(/%20/g, " ")

    if (moment(convertedDate, 'MMMM D, YYYY').isValid()) {
      day = moment(convertedDate, 'MMMM D, YYYY')
      json.unix = day.unix()
      json.natural = day.format('MMMM D, YYYY')
    } else {
      json.unix = null
      json.natural = null
    }
  }
  
  return json
}

app.listen(process.env.PORT || 8080, function() {
  console.log('Timestamp Microservice');
})

