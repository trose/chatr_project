const express = require('express');
const routes = require('./routes');
var http = require('http');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', routes);

const server = http.createServer(app);
server.listen(3000);

console.log('Listening on: http://localhost:3000');
