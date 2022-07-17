const Actor = require("../models/actor");
const mongoose = require("mongoose");

exports.create = (req, res, next) => {
  if (!req.body) {
    res.status(400).send("Content is required");
    return;
  }
  const actor = new Actor({...req.body});

  actor
    .save(actor)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

exports.find = (req, res, next) => {
    Actor.findById(mongoose.Types.ObjectId(req.query.id), (err, actor) => {
    console.log(req.query.id);
    if (err) {
      res.json({
        result: "failed",
        message: err.message,
      });
    } else {
      res.json({
        result: "successed",
        data: actor,
        message: "Success",
      });
    }
  });
};

exports.update = (req, res, next) => {
  const updateData = { ...req.body };
  Actor.findByIdAndUpdate(
    mongoose.Types.ObjectId(req.query.id),
    updateData,
    { new: true },
    (err, actor) => {
      if (err) {
        res.json({
          result: "failed",
          message: err.message,
        });
      } else {
        res.json({
          result: "successed",
          data: actor,
          message: "Success",
        });
      }
    }
  );
};

exports.deleteActor = (req, res, next) => {
    Actor.findByIdAndDelete(
    mongoose.Types.ObjectId(req.query.id),
    { new: true },
    (err) => {
      if (err) {
        res.json({
          result: "failed",
          message: err.message,
        });
      } else {
        res.json({
          result: "successed",
          message: "Success",
        });
      }
    }
  );
};

exports.addActor = (actorName) => {
  Actor.findOne({ name: actorName.name }, (err, actor) => {
    if (err) {
      console.log("failed");
    } else {
      if (actor === null) {
        const actor = new Actor({ ...actorName });
        actor
          .save(actor)
          .then((data) => {
            console.log(data)
            return data._id
          })
          .catch((err) => {
            console.log(err);
          });
      }else {
        return actor._id;
      }
    }
  });
};