const express = require('express');
const routes = require('./routes/api');
var myBucksData = require('./MyBucksStats.json')

var hourDataArray = [];
//console.log(hourDataArray);

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

  var myDay = pad(day, 2);

  var myDate = pad(year, 4) + "/" + pad(month, 2) + "/" + myDay;

  var currDatetime = myDate + " " + myHour;
  //  console.log(new Date(currDatetime));

  for (var i = 0; i < myBucksData.length; i++) {
    var convertMyBuckData = new Date(myBucksData[i].date);

    var getDay = (day == convertMyBuckData.getDate());
    var getYear = (year == convertMyBuckData.getFullYear());
    var getMonth = (month == (convertMyBuckData.getMonth() + 1));

    var getHour = (hour == convertMyBuckData.getHours());
    var isDatetimeMatch = (getDay && getYear && getMonth && getHour);
    if (isDatetimeMatch) {

      hourDataArray.push({
        date: convertMyBuckData,
        delay: myBucksData[i].delay
      })
    }
  }

  for (var i = 0; i < myBucksData.length; i++) {
    var getDatetime = myBucksData[i].date;

    if (getDatetime > currDatetime) {
      var prevDatetime = myBucksData[i - 1].date;
      var prevDelay = myBucksData[i - 1].delay;

      hourDataArray.push({
        date: new Date(year, month - 1, day, hour),
        delay: prevDelay
      })
      break;
    }
  }
  hourDataArray.sort(function(a, b) {
    if (a.date < b.date) {
      return -1
    } else if (b.date < a.date) {
      return 1
    } else {
      return 0
    }
  });
  //  hourDataArray.reverse();

  var currDatetimeConverted = new Date(currDatetime);

  var len = hourDataArray.length;
  for (var i = 0; i < len; i++) {
    var myCurrData = hourDataArray[i].date;
    var inSeconds = (60 * 60);

    if (len == 1) {
      // There is only one item in the array
      var current = hourDataArray[i].date;
      //    console.log(current);


    } else if (i == 0) {
      // I am at the start of the array and there is no previous item
      var current = currDatetimeConverted;
      var next = hourDataArray[i + 1].date;
      console.log(next);
      var currDelay = hourDataArray[i == 0 ? len - 1 : i - 1].delay;
      var nextDelay = hourDataArray[i + 1].delay;

      var currInMillSec = current.getTime();
      var nextInMillSec = next.getTime();
      var compDiffDates = (nextInMillSec - currInMillSec) / 1000;
      var compAvarage = currDelay / inSeconds * compDiffDates;
      //  console.log(compAvarage);

    } else if (i == (len - 1)) {
      // I am at the end of the array and there is no next item
      var current = hourDataArray[i].date;
      var previous = hourDataArray[i - 1].date;
      var prevDelay = hourDataArray[i == 0 ? len - 1 : i - 1].delay;
      console.log(prevDelay);

      var currInMillSec = current.getTime();
      var prevInMillSec = previous.getTime();
      var computeDifference = (currInMillSec - prevInMillSec) / 1000;
      console.log(computeDifference);

      computeAva = prevDelay / inSeconds * computeDifference;
      console.log(computeAva);

    } else {
      // When in the middle items
      var current = hourDataArray[i].date;
      var previous = hourDataArray[i - 1];
      var next = hourDataArray[i + 1].date;


    }


    // var current = hourDataArray[i].date;
    // var previous = hourDataArray[i == 0 ? len - 1 : i - 1].date;
    // var next = hourDataArray[i == len - 1 ? 0 : i + 1].date;

  }
  return;

}
getDelayForHour(15, 01, 2018, 15, "");
//2018/01/15 15:00:00
//2017/12/22 19:00:00
//2018/01/15 12:00:00
//2017/12/14 19:00:00



//initialiaze routes
app.use('/api', require("./routes/api").router);


//start the serverce
var server = app.listen(35000, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Now listening for requests http://%s:%s', host, port);

});
