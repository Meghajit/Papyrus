const pdfGenerator = require('./src/pdf-generator');
const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());
const multer = require('multer');

const port = 3000;

app.post('/pdf', (req, res) => {
    console.log("Generating pdf...");
    pdfGenerator.generate(req.body.webURL, 'webpage.pdf')
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
});

app.post('/html2pdf', multer().any(), (req, res) => {
  console.log("Generating pdf...");
  
  fs.writeFileSync("temp.html", req.files[0].buffer, 'utf8');
  var content = fs.readFileSync("temp.html", "utf-8");
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
});

app.listen(port, () => {
  console.log(`Papyrus listening at http://localhost:${port}`);
});