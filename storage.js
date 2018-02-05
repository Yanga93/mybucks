function getDelayForHour(day, month, year, hour, massiveJson) {
  // return a single number of seconds

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
