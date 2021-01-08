const express = require('express');
const app = require('express')();
const path = require('path');
const server = require('http').createServer(app);
const options = {
  transports: ['websocket'],
};
const io = require('socket.io')(server, options);

io.on('connection', (socket) => {
  /* … */
  console.log('io is ready');

  socket.on('message', (data) => {
    console.log('from client ' + data);
    socket.send('server get:' + data);
  });

  socket.on('salutations', (data) => {
    console.log(data);
  });
});

app.use(express.static(path.join(__dirname, `/`)));

app.use((req, res) => {
  res.status(404).send('page not found');
});

app.use(function (err, req, res, next) {
  if (err) {
    res.status(500).send('server is down.');
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.info(`==> 🍺  Express server running at localhost: ${PORT}`);
});
