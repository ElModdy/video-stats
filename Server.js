
var download = require('download-pdf');
var pdf2Text = require('pdf2text');
var moment = require('moment');


var pdf = "http://resources.motogp.com/files/results/2017/GER/MotoGP/RAC/Session.pdf"
var pathToPdf = __dirname + "/Stats.pdf"

var regTime = /RACE START [0-9]+:[0-9]+'[0-9]+/;
var regDay = /\w+ \d+, \d+/;
var dateFormat = "MMMM DD, YYYY HH:mm'ss";

var options = {
    directory: ".",
    filename: "Stats.pdf"
}

download(pdf, options, function(err){

    pdf2Text(pathToPdf).then(function(pages) {
      var firstPage = pages[0].join(" ");
      var startTime = firstPage.match(regTime)[0].substring(11, 19);
      var startDay = firstPage.match(regDay)[0];
      var date = startDay + " " + startTime;
      console.log(date);
      console.log(moment(date,dateFormat,true).format('x'));
    });
})
