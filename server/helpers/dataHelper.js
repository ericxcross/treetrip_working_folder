const ObjectID = require("mongodb").ObjectID;
const backupJson = require("../db/backup.json");

const DataHelper = function(collection) {
  this.collection = collection;
};
DataHelper.prototype.getAllTransportData = function(whenDone) {
  // return all data

  // whenDone(backupJson); //?

  this.collection
    .find()
    .toArray()
    .then(docs => whenDone(docs))
    .catch(err => {
      console.error(err);
      // res.status(500);
      console.log(backupJson);
      whenDone(backupJson); //?
      res.json({ status: 500, error: err });
    });
};

module.exports = DataHelper;
