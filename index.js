const pdfGenerator = require('./src/pdf-generator');
const express = require('express');
const app = express();
app.use(express.json());

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

app.listen(port, () => {
  console.log(`Papyrus listening at http://localhost:${port}`);
});