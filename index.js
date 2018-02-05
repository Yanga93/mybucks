const express = require('express');
const routes = require('./routes/api');
var myBucksData = require('./MyBucksStats.json')
var retrievedData = myBucksData;
//console.log(retrievedData);

var hourDataArray = [];



var openingDatetime = "2018\/01\/15 15:00:00";
var closingDatetime = "2018\/01\/15 16:00:00";

var combineDatetime = openingDatetime && closingDatetime;

//set up express app
const app = express();

function getDelayForHour() {
  // return a single number of seconds

  for (var i = 0; i < retrievedData.length; i++) {
    var myData = retrievedData[i].date;
    //console.log(myData);

    if (myData < closingDatetime && myData > openingDatetime) {
      hourDataArray.push(myData);
    }

  }

}

getDelayForHour();
//console.log(hourDataArray);

var findInArray = hourDataArray.find(elem => elem != openingDatetime && elem !=closingDatetime );
hourDataArray.push(openingDatetime);
hourDataArray.push(closingDatetime);

// var sortArray = hourDataArray.sort(function(closingDatetime, openingDatetime) {
//  var checkTheGreatest = openingDatetime - closingDatetime;
 //console.log(checkTheGreatest);

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
