const Papa = require('papaparse');
const express = require('express');
const routes = require('./routes/api');
const _ = require('lodash');
const myBucksData = require('./MyBucksStats.json');
const fs = require('fs');
const csv = require('fast-csv');
const ws = fs.createWriteStream('myBucksStats.csv');


var hourDataArray = [];

//set up express app
const app = express()

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

  hourDataArray.push({
    date: new Date(year, month - 1, day, hour),
    delay: 0
  })
}

function getDelayForHour(day, month, year, hour, massiveJson) {

  hourDataArray = [];
  var sumArray = [];

  addHour(day, month, year, hour + 1, "");

  var myHour,
    myDay,
    myDate,
    currDatetime,
    next;

  myHour = pad(hour, 2) + ":00:00";
  myDay = pad(day, 2);
  myDate = pad(year, 4) + "/" + pad(month, 2) + "/" + myDay;
  currDatetime = myDate + " " + myHour;

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


  var currDatetimeConverted = new Date(currDatetime);

  var len = hourDataArray.length;

  for (var i = 0; i < len; i++) {

    var myCurrData,
      inSeconds,
      current,
      next;

    inSeconds = (60 * 60);
    current = hourDataArray[i].date;

    if (i == 0) {

      // I am at the start of the array and there is no previous item
      var current,
        current,
        nextDelay,
        res,
        next;

      current = currDatetimeConverted;
      next = hourDataArray[i + 1].date;
      currDelay = hourDataArray[i == 0 ? len - 1 : i - 1].delay;
      nextDelay = hourDataArray[i + 1].delay;
      res = 0;


    } else if (i == (len - 1)) {

      // I am at the end of the array and there is no next item
      var current,
        previous,
        prevDelay,
        res,
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

     if (i == 0) {

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
      finalRes = (prevDelay / inSeconds * current);

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

  totalAverageDelayPerHour = _.sum(sumArray).toFixed(2);
  console.log(totalAverageDelayPerHour);
  return totalAverageDelayPerHour;


}
// getDelayForHour(07, 12, 2017, 14, ""); // return => 0.23
// getDelayForHour(05, 12, 2017, 09, ""); // return => 0.97
// getDelayForHour(01, 12, 2017, 12, ""); // return => 0.92
// getDelayForHour(01, 12, 2017, 13, ""); // return => 3.17
// getDelayForHour(09, 12, 2017, 12, ""); // return =>  5.40


function getReportForMyBucksData(isYear, isMonth, isDay, isHour, thisYear, thisMonth, thisDay, thisHour) {

  var resultDatetimeArray = [];
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

  var startD = new Date(startDate);
  var endD = new Date(endDate);


  while (startD < endD) {
    var _year = startD.getFullYear();
    var _month = startD.getMonth() + 1;
    var _day = startD.getDate();
    var _hours = startD.getHours();

    var getFullDatetime = _year + "-" + _month + "-" + _day + " " + " " + _hours + ":" + "00:00";

    startD.setHours(startD.getHours() + 1);
    resultingDelay = getDelayForHour(_day, _month, _year, _hours, "");
    resultDatetimeArray.push({
      date: getFullDatetime,
      delay: resultingDelay
    })

  }
  //converting the json to csv
  var csvData = Papa.unparse(resultDatetimeArray);
  console.log(csvData);

  fs.writeFile('myBucksStats.csv', csvData, function(err) {
    if (err)
      return console.log(err);
    console.log('success');
  });


}
getReportForMyBucksData(2017, 12, 01, 00, 2018, 01, 01, 00, "");
//2017/12/01 12:00:00   return => 0.92
//2017/12/01 13:00:00   return => 3.17
//2017/12/01 14:00:00   return => 1.54
//2017/12/01 15:00:00   return => 1.66
//2017/12/01 16:00:00   return => 0.20


//initialiaze routes
app.use('/api', require("./routes/api").router);


//start the serverce
var server = app.listen(35040, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Now listening for requests http://%s:%s', host, port);

});
