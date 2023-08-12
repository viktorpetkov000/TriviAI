const express = require('express');
const app = express();
const https = require('https');
const socketio = require('socket.io');

let options = {
  protocol: 'https:',
  hostname: 'opentdb.com',
  port: 443,
  path: '/api.php',
  method: 'GET',
  sslVersion: 'TLSv1.2'
};

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/js'));

const server = app.listen(3000, () => {
  console.log('Server running on port 3000');
});

const io = socketio(server);

app.get('/', (req, res) => {
  res.render('index');
});

io.on('connection', socket => {
  socket.on('getQuestion', () => {
    options.path = '/api.php?amount=1&type=multiple';
    const request = https.request(options, (response) => {
      response.on('data', (data) => {
        let question = JSON.parse(data.toString());
        console.log(question);
        socket.emit('question', question);
      });
    });
    request.end();
  });

  socket.on('getCategory', () => {
    options.path = '/api_category.php';
    const request = https.request(options, (response) => {
      response.on('data', (data) => {
        let categories = JSON.parse(data.toString());
        console.log(categories);
        socket.emit('category', categories);
      });
    });
    request.end();
  });
});
