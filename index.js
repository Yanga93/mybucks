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

  for (var i = 0; i < myBucksData.length; i++) {
    var convertMyBuckData = new Date(myBucksData[i].date);

    var getDay = (day == convertMyBuckData.getDate());
    //    console.log(getDay);
    var getYear = (year == convertMyBuckData.getFullYear());
    var getMonth = (month == (convertMyBuckData.getMonth() + 1));
    //console.log(getMonth);
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
    //console.log(getDatetime);
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

  hourDataArray.reverse();
  console.log(hourDataArray);
  for (var i = 0; i < hourDataArray.length; i++) {
    var myCurrData = hourDataArray[i].date;
    //    console.log(myCurrData);
    var currDatetimeConverted = new Date(currDatetime);
    //console.log(currDatetimeConverted);

    // if (myCurrData > currDatetimeConverted) {
    //   var startDate = myCurrData[i];
    //   console.log(startDate)
    //
    //   /***
    //
    //   ***/
    //
    // }

  }
  return;

}
getDelayForHour(15, 01, 2018, 15, "");
//2018/01/15 15:00:00
//2017/12/22 19:00:00


//initialiaze routes
app.use('/api', require("./routes/api").router);


//start the serverce
var server = app.listen(35000, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Now listening for requests http://%s:%s', host, port);

});
