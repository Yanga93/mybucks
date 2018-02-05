> new Date("23/12/2017 19:00:00")
Invalid Date
> new Date("23-12-2017 19:00:00")
Invalid Date
> new Date("2017-12-23 19:00:00")
Sat Dec 23 2017 19:00:00 GMT+0200 (SAST)
> var date1 = new Date("2017-12-23 19:00:00")
undefined
> date1
Sat Dec 23 2017 19:00:00 GMT+0200 (SAST)
> date1.getTime()
1514048400000
> var date2 = new Date("2017-12-23 19:18:02")
undefined
> date2.getTime()
1514049482000
> date2.getTime() - date1.getTime()
1082000
> (date2.getTime() - date1.getTime())/1000
1082
> var dateStr = “2017-12-23 19:00:00"
> var dateStr = "2017-12-23 19:00:00"
undefined
> dateStr
'2017-12-23 19:00:00'
> dateStr.split(" ")
[ '2017-12-23', '19:00:00' ]
> dateStr.split(" ")[0]
'2017-12-23'
> dateStr.split(" ")[0].split("-")
[ '2017', '12', '23' ]
> var parts = dateStr.split(" ")[0].split("-")
undefined
> var dateStr = ""
> var dateStr = "23/12/2017 19:00:00"
undefined
> dateStr.split(" ")[0]
'23/12/2017'
> var parts = dateStr.split(" ")[0].split("/")
undefined
> parts
[ '23', '12', '2017' ]
> parts[2] + "-" + parts[1] + "" + parts[0]
'2017-1223'
> parts[2] + "-" + parts[1] + "-" + parts[0]
'2017-12-23'
>
