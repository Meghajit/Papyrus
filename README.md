# Papyrus

> _Reading furnishes the mind only with materials of knowledge; it is thinking that makes what we read ours._
>
>-- _John Locke_

Papyrus is an application to save a pdf version of any webpage.

## Usage

### 1. Install dependencies
Run `npm install`

### 2. Start the server
Run `node index.js`

## API
Papyrus exposes some `POST` endpoints for pdf generation: 

1. `/pdf`: The webpage to be printed is provided as the request body param `webURL`.

Sample request:

```shell
curl --location --request POST 'localhost:3000/pdf' --header 'Content-Type: application/json' --data-raw '{
    "webURL": "https://en.wikipedia.org/wiki/Papyrus"
}' > download.pdf
```
The pdf is written to the file `download.pdf`.

2. `/html2pdf`: The webpage to be printed is provided as an HTML file with any key.

Sample request:

```shell
curl --location --request POST 'localhost:3000/html2pdf' \
--form 'file=@"/path/to/file/Or/Use/sample.html/from/this/repo"' > download.pdf
```

## Disclaimer

The project could use a lot of improvements, some of which are mentioned in the issues. Feel free to add feature
requests if you want some functionality to be added or contribute to the project by raising a PR.