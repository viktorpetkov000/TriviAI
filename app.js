const express = require("express");
const app = express();
const https = require('https');
let options = {
  protocol: 'https:',
  hostname: 'opentdb.com',
  port: 443,
  path: '/api.php',
  method: 'GET',
  sslVersion: 'TLSv1.2'
};

app.set('view engine', 'ejs');

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.get("/", (req, res) => {
  res.locals.getQuestion = getQuestion;
  res.render('index');
});

function getCategories() {
  options.path = '/api_categories.php'
  const request = https.request(options, (response) => {
    response.on('data', (data) => {
      console.log(data.toString());
    });
  });
  request.end();
}

function getQuestion() {
  options.path = '/api.php?amount=1&type=multiple'
  const request = https.request(options, (response) => {
    response.on('data', (data) => {
      console.log(JSON.parse(data.toString()));
    });
  });
  request.end();
}