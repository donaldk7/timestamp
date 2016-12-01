var http = require('http')
var url = require('url')
var moment = require('moment')

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

var server = http.createServer(function (request, response) {
  var reqUrl = url.parse(request.url, true)
  var inputDate = String(reqUrl.pathname) 
  inputDate = inputDate.substring(1)  // the pathname comes /1432234 so need to take the / away
  
  var day = undefined
  var json = {}
  
  if(isNumber(inputDate)) {   // check to see if input is purely number (i.e unix timestamp)
    day = moment.unix(inputDate)
    json.unix = inputDate
    json.natural = day.format('MMMM D, YYYY')
  } else {
    var convertedDate = inputDate.replace(/%20/g, " ")

    if (moment(convertedDate, 'MMMM D, YYYY').isValid()) {
      day = moment(convertedDate, 'MMMM D, YYYY')
      json.unix = day.valueOf()
      json.natural = day.format('MMMM D, YYYY')
    } else {
      json.unix = null
      json.natural = null
    }
  }
  
  response.writeHead(200, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify(json))
  
})

server.listen(process.env.PORT || 8080, function() {
  console.log('Timestamp Microservice');
})

