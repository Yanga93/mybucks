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
SyntaxError: Unexpected token ILLEGAL
    at Object.exports.createScript (vm.js:24:10)
    at REPLServer.defaultEval (repl.js:225:25)
    at bound (domain.js:287:14)
    at REPLServer.runBound [as eval] (domain.js:300:12)
    at REPLServer.<anonymous> (repl.js:417:12)
    at emitOne (events.js:82:20)
    at REPLServer.emit (events.js:169:7)
    at REPLServer.Interface._onLine (readline.js:210:10)
    at REPLServer.Interface._line (readline.js:549:8)
    at REPLServer.Interface._ttyWrite (readline.js:826:14)
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
