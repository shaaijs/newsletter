require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');
let EmailModel;

app.use(cors())

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB_URI, {
    bufferMaxEntries: 0,
    autoReconnect: true,
    reconnectTries: 1
}, () => {

  EmailModel = mongoose.model('Email', new mongoose.Schema(
      {email: String},
      {timestamps: true}
  ));
});

app.use('/:email', function (req, res) {
  EmailModel.create({email: req.params.email})
  res.end()
});

const http = require('http');
const server = http.createServer(app);
const port = process.env.PORT || 3000;
server.listen(port);
console.log('Express app started in ' + app.get('env') + ' mode on port ' + port);
