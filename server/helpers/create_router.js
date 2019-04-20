const express = require("express");
const ObjectID = require("mongodb").ObjectID;

const createRouter = function(collection) {
  const router = express.Router();

  //SHOW ALL
  router.get("/", (req, res) => {
    collection
      .find()
      .toArray()
      .then(docs => res.json(docs))
      .catch(err => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  //CREATE
  router.post("/", (req, res) => {
    const newData = req.body;
    collection
      .insertOne(newData)
      .then(() => {
        collection
          .find()
          .toArray()
          .then(docs => res.json(docs));
      })
      .catch(err => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  //UPDATE
  router.put("/:id", (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    delete updatedData._id;

    collection
      .updateOne({ _id: ObjectID(id) }, { $set: updatedData })
      .then(() => {
        collection
          .find()
          .toArray()
          .then(docs => res.json(docs));
      })
      .catch(err => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  //DELETE
  router.delete("/:id", (req, res) => {
    const id = req.params.id;
    collection
      .deleteOne({ _id: ObjectID(id) })
      .then(() => {
        collection
          .find()
          .toArray()
          .then(docs => res.json(docs));
      })
      .catch(err => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  return router;
};

module.exports = createRouter;
