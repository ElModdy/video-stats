var download = require('download-pdf');
var pdf2Text = require('pdf2text');
var moment = require('moment');
var express = require('express');
var request = require('request');

var app = express();

app.use(express.static(__dirname + '/public'));

var pathToPdf = "./pdfs/Session.pdf";

var regTime = /RACE START [0-9]+:[0-9]+'[0-9]+/;
var regDay = /\w+ \d+, \d+/;
var dateFormat = "MMMM DD, YYYY HH:mm'ss";

function Nodo(value, child){
  this.value = value;
  this.child.push(child);
}

Nodo.prototype.cerca = function() {
  //AGGIUNGI NODO
}

Nodo.prototype.aggiungi = function() {
  //CERCA NODO
}

var root [];

//EXAMPLE URL: http://localhost:3001/gettimestamp?anno=2017&pista=GER&campionato=MotoGP&sessione=RAC
app.get('/gettimestamp', function(req, res){

  var details = [
    req.query.anno,
    req.query.pista,
    req.query.campionato,
    req.query.sessione
  ];

  var pdfURL = "http://resources.motogp.com/files/results/" + details.join("/") + "/Session.pdf";

  download(pdfURL, {filename: pathToPdf}, function(err){
      //CERCA NODO
      pdf2Text(pathToPdf).then(function(pages) {
        var firstPage = pages[0].join(" ");
        var milliDate = moment(firstPage.match(regDay)[0] + " " +
                               firstPage.match(regTime)[0].substring(11, 19),
                               dateFormat,
                               true).format('x');
        //AGGIUNGI NODO
        res.json(parseInt(milliDate));
      });
  });
});

app.listen(3001, function() {
  console.log('Server listening!');
});
