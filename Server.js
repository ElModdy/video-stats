var download = require('download-pdf');
var pdf2Text = require('pdf2text');
var moment = require('moment');
var express = require('express');
var request = require('request');
var fs = require('fs');

var app = express();

app.use(express.static(__dirname + '/public'));

var pathToPdf = "./pdfs/Session.pdf";

var regTime = /RACE START [0-9]+:[0-9]+'[0-9]+/;
var regDay = /\w+ \d+, \d+/;
var dateFormat = "MMMM DD, YYYY HH:mm'ss";

function Nodo(value){
  this.value = value;
  this.childs = [];
}

Nodo.prototype.addChild = function(child) {
  this.childs.push(child);
}

var root = new Nodo(null);

function cerca(details, level, nodo){
  var childs = nodo.childs;
  if(level == 4){
    return childs[0].value;
  }
  for(var i=0, len = childs.length; i < len; i++){
    if (childs[i].value == details[level]) {
      return cerca(details, ++level, childs[i]);
    }
  }
  return [level,nodo];
}

function add(details, value, level, nodo){
  if(level == 4){
    nodo.addChild(new Nodo(value));
  }else{
    var child = new Nodo(details[level]);
    nodo.addChild(child);
    add(details, value, ++level, child);
  }
}

app.get('/gettimestamp', function(req, res){
  console.log("request received");
  var details = [
    req.query.anno,
    req.query.pista,
    req.query.campionato,
    req.query.sessione
  ];

  var result = cerca(details, 0, root);
  if(result.constructor === Array){
    var pdfURL = "http://resources.motogp.com/files/results/" + details.join("/") + "/Session.pdf";

    download(pdfURL, {filename: pathToPdf}, function(){
      var buffer = fs.readFileSync(pathToPdf)
      pdf2Text(buffer).then(function(pages) {
        var firstPages = pages[0].concat(pages[1]).join(" ");
        var milliDate = parseInt(moment(firstPages.match(regDay)[0] + " " +
                                        firstPages.match(regTime)[0]
                                        .substring(11, 19),
                                        dateFormat,
                                        true).format('x'));
        add(details, milliDate, result[0], result[1]);
        res.json(milliDate);
      });
    });
  }else{
    res.json(result);
  }
});

app.listen(3000, function() {
  console.log('Server listening!');
});
