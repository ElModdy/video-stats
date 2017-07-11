
var download = require('download-pdf');
var pdf2Text = require('pdf2text');
var moment = require('moment');

var anno = "2017";
var pista = "GER";
var campionato = "MotoGP";
var sessione = "RAC";

var pdfURL = "http://resources.motogp.com/files/results/" + anno + "/" +
                                                            pista + "/" +
                                                            campionato + "/" +
                                                            sessione + "/Session.pdf";
var pathToPdf = __dirname + "/Stats.pdf";

var regTime = /RACE START [0-9]+:[0-9]+'[0-9]+/;
var regDay = /\w+ \d+, \d+/;
var dateFormat = "MMMM DD, YYYY HH:mm'ss";

var options = {
    directory: ".",
    filename: "Stats.pdf"
}

download(pdfURL, options, function(err){
    pdf2Text(pathToPdf).then(function(pages) {
      var firstPage = pages[0].join(" ");
      var milliDate = moment(firstPage.match(regDay)[0] + " " +
                             firstPage.match(regTime)[0].substring(11, 19),
                             dateFormat,
                             true).format('x');
      console.log(milliDate);
    });
})
