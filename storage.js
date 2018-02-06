function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function getDelayForHour(day, month, year, hour, massiveJson) {

  var openingDateTime = pad(year, 4) + "/" + pad(month, 2) + "/" + pad(day, 2) + " " + pad(hour, 2) + ":00:00";
  console.log(openingDateTime);
  return;
  for (var i = 0; i < hourData.length; i++) {

    if (hourData) {

    }



    var currentDate = hourData[i]; // returns the last ob
    //console.log(currentDate);


    var previousDate = hourData[17].date; // returnsthe second last
    //console.log(currentDate);

    var currentDateInMilliSec = Date.parse(currentDate);
    //console.log(lastObjInMilliSec);


    var previousDateInMilliSec = Date.parse(previousDate);
    //console.log(secLastObjInMilliSec);
    //console.log(dateData.length) //return 19;

    //compute the difference
    var calculationInSec = (currentDateInMilliSec - previousDateInMilliSec) / 1000;

    //console.log(calculationInSec); // returns the correct value of 1803
    // console.log(getDatetime);


  }

}

getDelayForHour(1, 12, 2017, 3, "");
