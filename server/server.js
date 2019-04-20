<<<<<<< HEAD
const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const createRouter = require("./helpers/create_router.js");

app.use(express.static(path.join(__dirname, "../client/public")));
app.use(bodyParser.json());

MongoClient.connect("mongodb://localhost:27017")
  .then(client => {
    const db = client.db("carbontrip");
    const mustDosCollection = db.collection("mustDos");
    app.use("/api/mustDos", createRouter(mustDosCollection));
  })
  .catch(err => {
    console.error("Failed to connect to DB");
    console.error(err);
  });
=======
const express = require('express');
const app = express();
const path = require('path');
const parser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');

const publicPath = path.join(__dirname, '../client/public');
app.use(express.static(publicPath));

app.use(parser.json());

MongoClient.connect('mongodb://localhost:27017')
  .then((client) => {
    const db = client.db('carbontrip');
    const collection = db.collection('transportmodes');
    const router = createRouter(collection);
    app.use('/api/transportmodes', router);
  })
  .catch(console.err);
>>>>>>> develop

app.listen(3000, function () {
  console.log(`Listening on port ${ this.address().port }`);
});
