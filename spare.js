const express = require('express');
//const routes = require('./routes/api');
var myBucksData = require('./MyBucksStats.json')

const dateTimeArray = {};
console.log(dateTimeArray);

//set up express app
const app = express();


function getDatetime() {
  var i = 0;
  myBucksData.map(date => {
    var gtDate = date.date;
    console.log(gtDate);

  });

  //for loop
  for (gtDate in dateTimeArray) {
    
    if (dateTimeArray[date] > new Date("01-25-2007")) {
      console.log(dateTimeArray[date]);
      dateTimeArray[date].push();

      //console.log("found a day", dateTimeArray[date])
    } else {
      //  console.log("We couldn't find the date");
    }
  }

}
getDatetime();

//---- end of get date fundction ----//


function getDelayForHour(day, month, year, hour, massiveJson) {
  // return a single number of seconds
  myBucksData.map(myData => {
    var day = '27';
    var month = '12';
    var year = '2017';
    var hour = '15:00:00';
    var massiveJson = myData.date;
    var getDelayPerSec = myData.delay;

    //console.log(massiveJson);
  })

}
getDelayForHour();


//initialiaze routes
app.use('/api', require("./routes/api").router);


//start the serverce
var server = app.listen(34040, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Now listening for requests http://%s:%s', host, port);

});
