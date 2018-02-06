const express = require('express');
const routes = require('./routes/api');
var myBucksData = require('./MyBucksStats.json')
var retrievedData = myBucksData;
//console.log(retrievedData);



var openingDatetime = "2018/01/13 11:56:03";



//set up express app
const app = express();


function getDelayForHour() {
  // return a single number of seconds


}myBucksData.sort(function (a, b) {
    if (a.date < b.date) {
        return -1
    } else if (b.date < a.date) {
        return 1
    } else {
        return 0
    }
});
// console.log(myBucksData);
for (var i = 0; i < myBucksData.length; i++){
  if (myBucksData[i].date > openingDatetime){
    console.log(myBucksData[i-1].date);
    console.log(myBucksData[i-1].delay);
    break;
  }
}
return;
getDelayForHour();


//initialiaze routes
app.use('/api', require("./routes/api").router);


//start the serverce
var server = app.listen(35000, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Now listening for requests http://%s:%s', host, port);

});
