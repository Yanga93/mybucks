const express = require('express');
const routes = require('./routes/api');
// var moment = require('moment');
var _ = require('lodash');
var myBucksData = require('./MyBucksStats.json')

var hourDataArray = [];

var sumArray = [];


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

function addHour(day, month, year, hour, massiveJson) {
  var addHour = pad(year, 4) + "/" + pad(month, 2) + "/" + pad(day, 2) + " " + pad(addHour, 2) + ":00:00";
  //console.log(addHour);
  hourDataArray.push({
    date: new Date(year, month - 1, day, hour),
    delay: 0
  })
}
addHour(15, 01, 2018, 16, "");


function getDelayForHour(day, month, year, hour, massiveJson) {

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

  //console.log(currDatetime);

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
      nextDelay = hourDataArray[i + 1].delay;

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

      res = (current.getTime() - previous.getTime()) / 1000;

    } else {
      // When in the middle items
      var current,
        previous,
        prevMiddleDelay,
        res,
        next;

      current = hourDataArray[i].date;
      previous = hourDataArray[i - 1].date;
      prevMiddleDelay = hourDataArray[i - 1].delay;
      res = (current.getTime() - previous.getTime()) / 1000;
    }

    hourDataArray[i].sec = res;
  }

  for (var i = 0; i < len; i++) {

    var getSec = hourDataArray[i].sec;

    if (len == 1) {
      // There is only one item in the array
    } else if (i == 0) {
      // I am at the start of the array and there is no previous item
      var
        current,
        nextDelay,
        finalRes,
        next;

      current = getSec;
      next = hourDataArray[i + 1].sec;
      currDelay = hourDataArray[i == 0 ? len - 1 : i - 1].delay;
      nextDelay = hourDataArray[i + 1].delay;

      finalRes = (currDelay / inSeconds * next);

    } else if (i == (len - 1)) {
      // I am at the end of the array and there is no next item
      var
        current,
        previous,
        prevDelay,
        finalRes,
        next;

      current = hourDataArray[i].sec;
      previous = hourDataArray[i - 1].sec;
      prevDelay = hourDataArray[i == 0 ? len - 1 : i - 1].delay;
      preDelay = hourDataArray[i == 0 ? len - 1 : i - 1].delay;
      finalRes = (prevDelay / inSeconds * previous);

    } else {
      // I am at the middle and there's previous, current and next
      var
        currSec,
        prevSec,
        preDelay,
        finalRes,
        next,

        currSec = hourDataArray[i].sec;
      prevSec = hourDataArray[i - 1].sec;
      preDelay = hourDataArray[i == 0 ? len - 1 : i - 1].delay;

      finalRes = ((preDelay / inSeconds) * currSec);
    }

    hourDataArray[i].finalRes = finalRes;
    sumArray.push(finalRes);
  }
  var totalAverageDelayPerHour = _.sum(sumArray);
   console.log(totalAverageDelayPerHour);

  return;

}
getDelayForHour(15, 01, 2018, 15, "");
//2017/12/18 17:00:00 return => 0.3
//2017/12/19 12:00:00 return => 0.8833
//2018/01/15 15:00:00
//2017/12/22 19:00:00
//2018/01/15 12:00:00
//2017/12/14 19:00:00


var myVar;



function getReportForMyBucksData(isYear, isMonth, isDay, isHour, thisYear, thisMonth, thisDay, thisHour, getDelayForHour) {

  var
    isYear,
    isMonth,
    isDay,
    isHour,
    thisYear,
    thisMonth,
    thisDay,
    thisHour,
    next,

    isYear = pad(isYear, 4);
  isMonth = pad(isMonth, 2);
  isDay = pad(isDay, 2);
  isHour = pad(isHour, 2);

  thisYear = pad(thisYear, 4);
  thisMonth = pad(thisMonth, 2);
  thisDay = pad(thisDay, 2);
  thisHour = pad(thisHour, 2);

  var startDate = isYear + "/" + isMonth + "/" + isDay + " " + isHour + ":00:00";
  var endDate = thisYear + "/" + thisMonth + "/" + thisDay + " " + thisHour + ":00:00";

  /**
  Get ====>>>
  * startD.year
  * startD.month1
  *startD.day1
  *startD.hour

  Then pass them as parameters to getDelayForHour();

  **/
  var startD = new Date(startDate);
  var endD = new Date(endDate);
  while (startD < endD) {


    startD.setHours(startD.getHours() + 1);
    var t = new Date(startD);
    var toStringDate = t.toString();
//    console.log(toStringDate);

/**
if (typeof getDelayForHour === "function") {


    getDelayForHour(isYear, isMonth, isDay, isHour);
  }
**/


  //  getDelayForHour();
  }

}
getReportForMyBucksData(2017, 12, 01, 23, 2017, 12, 31, 00);
// startdate 2017/12/01 00:00:00
// endDate  2017/12/31 00:00:00

//initialiaze routes
app.use('/api', require("./routes/api").router);


//start the serverce
var server = app.listen(34000, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Now listening for requests http://%s:%s', host, port);

});
