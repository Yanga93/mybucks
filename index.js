const express = require('express');
const routes = require('./routes/api');
var myBucksData = require('./MyBucksStats.json')

var hourDataArray = [];

//set up express app
const app = express();

myBucksData.sort(function(a, b) {
  if (a.date < b.date) {
    return -1
  } else if (b.date < a.date) {
    return 1
  } else {
    return 0
  }
});

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function getDelayForHour(day, month, year, hour, massiveJson) {
  // return a single number of seconds
  var myHour = pad(hour, 2) + ":00:00";
//console.log(myHour.getHours());
  //console.log(myHour); // returns => 19:00:00

  var myDay = pad(day, 2);

  var myDate = pad(year, 4) + "/" + pad(month, 2) + "/" + myDay;
  //console.log(myDate); //returns => 2017/12/22

  var currDatetime = myDate + " " + myHour;
  //  console.log(currDatetime)returns =>  2017/12/22 19:00:00;

  for (var i = 0; i < myBucksData.length; i++) {
    var getDatetime = myBucksData[i].date;
    //console.log(getDatetime);
    if (getDatetime > currDatetime) {
      var prevDatetime = myBucksData[i - 1].date;
      var prevDelay = myBucksData[i - 1].delay;
      //console.log(prevDatetime);
      //  console.log(prevDelay);

      var date1 = new Date(currDatetime);
      var date2 = new Date(prevDatetime);

      //compute the difference between the datetime in seconds
      var currDatetimeInMillSec = date1.getTime();
      var prevDatetimeInMillSec = date2.getTime();


      var computeDiffInSec = (currDatetimeInMillSec - prevDatetimeInMillSec) / 1000;
      //console.log(computeDiffInSec);

      break;
    }
  }

  for (var i = 0; i < myBucksData.length; i++) {
    var convertMyBuckData = new Date(myBucksData[i].date);
    //console.log(convertMyBuckData);//returns => Tue Jan 16 2018 13:28:02 GMT+0200 (SAST)

    var getDay = (day == convertMyBuckData.getDate());
    //console.log(getDay);
    var getYear = (year == convertMyBuckData.getFullYear());
    var getMonth = (month == (convertMyBuckData.getMonth()+1));
    var getHour = (hour == convertMyBuckData.getHours());
//    console.log(convertMyBuckData.getDate(), " ", convertMyBuckData.getFullYear(), " ",convertMyBuckData.getMonth()," ",convertMyBuckData.getHours());
    if ( getDay && getYear &&  getMonth && getHour) {

      hourDataArray.push(convertMyBuckData)

      console.log(hourDataArray);
    } else {
//      console.log("Not the same datetime");
    }
  }
  return;

}
getDelayForHour(22, 12, 2017, 19, "");
//2017/12/22 19:00:00


//initialiaze routes
app.use('/api', require("./routes/api").router);


//start the serverce
var server = app.listen(35000, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Now listening for requests http://%s:%s', host, port);

});
