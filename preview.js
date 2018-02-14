const express = require('express');
const routes = require('./routes/api');
const listToArray = require('list-to-array');
// load math.js
const math = require('mathjs');
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

function addHour(day, month, year, hour, addHour, massiveJson) {
  var addHour = pad(year, 4) + "/" + pad(month, 2) + "/" + pad(day, 2) + " " + pad(addHour, 2) + ":00:00";

  hourDataArray.push({
    date: new Date(year, month - 1, day, hour),
    delay: 0

  })
  // console.log(hourDataArray);
}
addHour(15, 01, 2018, 16, "");


function getDelayForHour(day, month, year, hour, addHour, massiveJson) {

  var myHour,
    myDay,
    myDate,
    currDatetime,
    addHour,
    next;

  myHour = pad(hour, 2) + ":00:00";

  myDay = pad(day, 2);

  myDate = pad(year, 4) + "/" + pad(month, 2) + "/" + myDay;

  currDatetime = myDate + " " + myHour;

  //  console.log(new Date(currDatetime));

  for (var i = 0; i < myBucksData.length; i++) {

    var convertMyBuckData,
      getDay,
      getYear,
      getMonth,
      getHour,
      isDatetimeMatch,
      next;

    convertMyBuckData = new Date(myBucksData[i].date);


    getDay = (day == convertMyBuckData.getDate());
    getYear = (year == convertMyBuckData.getFullYear());
    getMonth = (month == (convertMyBuckData.getMonth() + 1));

    getHour = (hour == convertMyBuckData.getHours());
    isDatetimeMatch = (getDay && getYear && getMonth && getHour);
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
      //   console.log(hourDataArray);

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

    var myCurrData,
      inSeconds,
      current,
      next;

    // myCurrData = hourDataArray[i].date;
    inSeconds = (60 * 60);
    current = hourDataArray[i].date;


    if (len == 1) {
      // There is only one item in the array


    } else if (i == 0) {
      // I am at the start of the array and there is no previous item
      var current,
        next,
        current,
        nextDelay,
        compDiffDates,
        compAvarage,
        next;

      current = currDatetimeConverted;
      next = hourDataArray[i + 1].date;
      currDelay = hourDataArray[i == 0 ? len - 1 : i - 1].delay;
      //    console.log(currDelay);
      nextDelay = hourDataArray[i + 1].delay;
      //      console.log(nextDelay);

      compDiffDates = (next.getTime() - current.getTime()) / 1000;


    } else if (i == (len - 1)) {
      // I am at the end of the array and there is no next item
      var current,
        previous,
        prevDelay,
        computeDifference,
        next;

      current = hourDataArray[i].date;
      previous = hourDataArray[i - 1].date;
      prevDelay = hourDataArray[i == 0 ? len - 1 : i - 1].delay;
      //      console.log(prevDelay);


      res = (current.getTime() - previous.getTime()) / 1000;
      // console.log(computeDifference);
    } else {
      // When in the middle items
      var current,
        previous,
        res,
        next;

      current = hourDataArray[i].date;
      previous = hourDataArray[i - 1].date;
      prevMiddleDelay = hourDataArray[i - 1].delay;
      //    console.log(prevMiddleDelay);
      res = (current.getTime() - previous.getTime()) / 1000;

    }


    hourDataArray[i].sec = res;
    // console.log(res);
  }
  //  console.log(hourDataArray)

  for (var i = 0; i < len; i++) {

    var getSec = hourDataArray[i].sec;
    // console.log(getSec);

    if (len == 1) {
      // There is only one item in the array
    } else if (i == 0) {
      // I am at the start of the array and there is no previous item
      var current,
        next,
        current,
        nextDelay,
        compDiffDates,
        compAvarage,
        next;

      current = getSec; //return 0 inSeconds delay

      next = hourDataArray[i + 1].sec; // return 1803 inSeconds delay


      currDelay = hourDataArray[i == 0 ? len - 1 : i - 1].delay; // return 0 inSeconds delay

      nextDelay = hourDataArray[i + 1].delay; //return 18 inSeconds delay


      var compInSecRes = (current / inSeconds * next); //return NaN



    } else if (i == (len - 1)) {
      // I am at the end of the array and there is no next item
      var current,
        previous,
        prevDelay,
        next;

      current = hourDataArray[i].sec; //return => 57
      //console.log(current);
      previous = hourDataArray[i - 1].sec; //return => 61
      //  console.log(previous);
      prevDelay = hourDataArray[i == 0 ? len - 1 : i - 1].delay; //return => 0
      //    console.log(prevDelay);
      preDelay = hourDataArray[i == 0 ? len - 1 : i - 2].delay; //return => 13
      //      console.log(preDelay);

      var computeSecondRow = (preDelay / inSeconds * previous); // return => 0.22027777777777777
      console.log(computeSecondRow);



    } else {
      // I am at the middle and there's previous, current and next
      var currSec,
        prevSec,


        currSec = hourDataArray[i].sec;
      //  console.log(currSec);
      prevSec = hourDataArray[i - 1].sec;
      //  console.log(prevSec);

      //onsole.log(prevSec);
      var finalRes = ((prevMiddleDelay / inSeconds) * currSec);
        console.log(finalRes);
      //  var totalAverageDelayPerHour = math.sum(finalRes);
    }

    hourDataArray[i].finalRes = finalRes;
    //console.log(totalAverageDelayPerHour);
    var totalAverageDelayPerHourInSec = hourDataArray[i].finalRes;

  }
  //console.log(math.sum(totalAverageDelayPerHourInSec));

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
var server = app.listen(36000, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Now listening for requests http://%s:%s', host, port);

});
