const pdfGenerator = require('../../pdf-generator');
const fs = require('fs');

exports.postHTML2PDF = (req, res) => {
  console.log("Generating pdf...");
  
  fs.writeFileSync("temp.html", req.file.buffer, 'utf8');
  var content = fs.readFileSync("temp.html");
  pdfGenerator.generateFromHTML(content, 'webpage.pdf')
      .then(result => {
          console.log("Success: " + result);
          res.sendFile('webpage.pdf',
              {'root' : __dirname},
              function (err) {
                if (err) {
                  console.log("Error in sending file:" + err.stack);
                } else {
                  console.log("File sent");
                }
              });
      })
      .catch(err => {
          console.log(err.stack);
          res.sendStatus(500)
      });
};