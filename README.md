# Papyrus

> _Reading furnishes the mind only with materials of knowledge; it is thinking that makes what we read ours._
>
>-- _John Locke_

Papyrus is a node module which saves a pdf version of any webpage.

## Usage

Papyrus exposes just one `POST` endpoint for pdf generation: `/pdf`. The webpage to be printed is provided as the
request body param `webURL`.

Sample request:

```shell
curl --location --request POST 'localhost:3000/pdf' --header 'Content-Type: application/json' --data-raw '{
    "webURL": "https://en.wikipedia.org/wiki/Papyrus"
}'
```

A pdf file will be prompted for download as a successful response.

## Disclaimer

The project could use a lot of improvements, some of which are mentioned in the issues. Feel free to add feature
requests if you want some functionality to be added or contribute to the project by raising a PR.