const pdfGenerator = require('./src/pdf-generator');

pdfGenerator.generate('https://expressjs.com/en/changelog/4x.html', 'webpage.pdf')
.then(result => console.log("Success: " + result))
.catch(err => console.log("Error: " + err));