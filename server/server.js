const express = require("express");
const app = express();
const path = require("path");
const parser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const createRouter = require("./helpers/create_router.js");

const publicPath = path.join(__dirname, "../client/public");
app.use(express.static(publicPath));

app.use(parser.json());

MongoClient.connect("mongodb://localhost:27017")
  .then(client => {
    const db = client.db("carbontrip");
    const collection = db.collection("transportmodes");
    const collectionAlt = db.collection("alternativeTransportModes");
    const router = createRouter(collection);
    const routerAlt = createRouter(collectionAlt);
    app.use("/api/transportmodes", router);
    app.use("/api/alternativeTransportModes", routerAlt)
  })
  .catch(console.err);

app.listen(3000, function() {
  console.log(`Listening on port ${this.address().port}`);
});
