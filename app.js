// app.js
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
app.use(express.static(__dirname + '/js'));

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.get("/", (req, res) => {
  res.render('index');
});

// Add a new route to handle the fetch request from the client
app.get("/getQuestion", (req, res) => {
  // Call the getQuestion function and send the result as JSON
  getQuestion().then((question) => {
    res.json(question);
  });
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
  // Return a promise that resolves with the question object
  return new Promise((resolve, reject) => {
    const request = https.request(options, (response) => {
      response.on('data', (data) => {
        let question = JSON.parse(data.toString());
        console.log(question);
        resolve(question);
      });
    });
    request.end();
  });
}
