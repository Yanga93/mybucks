const express = require('express');
const routes = require('./routes/api');
var myBucksData = require('./MyBucksStats.json')
var retrievedData = myBucksData;
//console.log(retrievedData);

var hourDataArray = [];



var openingDatetime = "2018\/01\/15 08:00:00";
// var closingDatetime = "2018\/01\/15 16:00:00";

//var combineDatetime = openingDatetime && closingDatetime;

//set up express app
const app = express();

function getDelayForHour() {
  // return a single number of seconds

  for (var i = 0; i < retrievedData.length; i++) {
    var myData = retrievedData[i];
    //console.log(myData);

    if (myData < closingDatetime && myData > openingDatetime) {
      hourDataArray.push(myData);
    }

  }

}

//getDelayForHour();
//console.log(hourDataArray);

myBucksData.sort(function (a, b) {
    if (a.date < b.date) {
        return -1
    } else if (b.date < a.date) {
        return 1
    } else {
        return 0
    }
});
console.log(myBucksData);
for (var i = 0; i < myBucksData.length; i++){
  if (myBucksData[i].date > openingDatetime){
    console.log(myBucksData[i-1].date);
    console.log(myBucksData[i-1].delay);
    break;
  }
}
return;


var findInArray = hourDataArray.find(elem => elem != openingDatetime && elem !=closingDatetime );
hourDataArray.push(openingDatetime);
hourDataArray.push(closingDatetime);

hourDataArray.sort(function (a, b) {
    if (a < b) {
        return -1
    } else if (b < a) {
        return 1
    } else {
        return 0
    }
})

//console.log(sortArray);
console.log(hourDataArray);



//initialiaze routes
app.use('/api', require("./routes/api").router);


//start the serverce
var server = app.listen(35000, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Now listening for requests http://%s:%s', host, port);

});
