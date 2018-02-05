const express = require('express');
const routes = require('./routes/api');
var myBucksData = require('./MyBucksStats.json')


//set up express app
const app = express();


//sort the massive Json file
myBucksData.sort(function(a, b) {
  if (a < b) {
    return -1
  } else if (b < a) {
    return 1
  } else {
    return 0
  }
})

function getDelayForHour(day, month, year, hour, massiveJson) {
  // return a single number of seconds
  myBucksData.map(myData => {

    var massiveJson = myData;


    console.log(massiveJson);
  })

}
getDelayForHour();


//initialiaze routes
app.use('/api', require("./routes/api").router);


//start the serverce
var server = app.listen(31000, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Now listening for requests http://%s:%s', host, port);

});
