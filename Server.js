var download = require('download-pdf')

var pdf = "https://sfc82c600e839372f.jimcontent.com/download/version/1444428002/module/10376322412/name/Novelle%20e%20Paesi%20Valdostani.pdf"

var options = {
    directory: ".",
    filename: "leso.pdf"
}

download(pdf, options, function(err){
    var pathToPdf = __dirname + "/leso.pdf"
    var extract = require('pdf-text-extract')
    var options = {
      cwd: "./"
    }
    extract(pathToPdf, options, function (err, pages) {
      if (err) {
        console.dir(err)
        return
      }
      console.dir(text)
    })
})
