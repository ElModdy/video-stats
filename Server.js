var download = require('download-pdf');
var pdf2Text = require('pdf2text');
var moment = require('moment');
var express = require('express');

var app = express();

app.use(express.static(__dirname + '/public'));

app.listen(3002, function() {
  console.log('Server listening!');
});

var anno = "2017";
var pista = "GER";
var campionato = "MotoGP";
var sessione = "RAC";

var details = [anno,
               pista,
               campionato,
               sessione];

var pdfURL = "http://resources.motogp.com/files/results/" + details.join('/') + "/Session.pdf";

var pathToPdf = "./pdfs/" + details.join('_') + ".pdf";

var regTime = /RACE START [0-9]+:[0-9]+'[0-9]+/;
var regDay = /\w+ \d+, \d+/;
var dateFormat = "MMMM DD, YYYY HH:mm'ss";

download(pdfURL, {filename: pathToPdf}, function(err){
    pdf2Text(pathToPdf).then(function(pages) {
      var firstPage = pages[0].join(" ");
      var milliDate = moment(firstPage.match(regDay)[0] + " " +
                             firstPage.match(regTime)[0].substring(11, 19),
                             dateFormat,
                             true).format('x');
      console.log(milliDate);
    });
});
