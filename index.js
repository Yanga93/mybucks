const express = require('express');
const routes = require('./routes/api');
var myBucksData = require('./MyBucksStats.json')
var retrievedData = myBucksData;
//console.log(retrievedData);

var hourDataArray = [];



var openingDatetime = "2018\/01\/15 15:00:00";
var closingDatetime = "2018\/01\/15 16:00:00";

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


function checkArray() {
  // var ID = document.getElementById('input2').value;
  var checkOut = hourDataArray.includes("2018\/01\/15 15:00:00");
    //console.log(checkOut);
}
checkArray();

//console.log(hourDataArray);



// Convert array to object
// var convArrToObj = function(hourDataArray){
//     var thisEleObj = new Object();
//     if(typeof hourDataArray == "object"){
//         for(var i in hourDataArray){
//             var thisEle = convArrToObj(hourDataArray[i]);
//             thisEleObj[i] = thisEle;
//         }
//     }else {
//         thisEleObj = hourDataArray;
//     }
//     return thisEleObj;
// }
// convArrToObj();


//initialiaze routes
app.use('/api', require("./routes/api").router);


//start the serverce
var server = app.listen(35000, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Now listening for requests http://%s:%s', host, port);

});
