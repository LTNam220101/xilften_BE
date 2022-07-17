const Director = require("../models/director");
const mongoose = require("mongoose");

exports.create = (req, res, next) => {
  if (!req.body) {
    res.status(400).send("Content is required");
    return;
  }
  const director = new Director({...req.body});

  director
    .save(director)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

exports.find = (req, res, next) => {
    Director.findById(mongoose.Types.ObjectId(req.query.id), (err, director) => {
    console.log(req.query.id);
    if (err) {
      res.json({
        result: "failed",
        message: err.message,
      });
    } else {
      res.json({
        result: "successed",
        data: director,
        message: "Success",
      });
    }
  });
};

exports.update = (req, res, next) => {
  const updateData = { ...req.body };
  Director.findByIdAndUpdate(
    mongoose.Types.ObjectId(req.query.id),
    updateData,
    { new: true },
    (err, director) => {
      if (err) {
        res.json({
          result: "failed",
          message: err.message,
        });
      } else {
        res.json({
          result: "successed",
          data: director,
          message: "Success",
        });
      }
    }
  );
};

exports.deleteDirector = (req, res, next) => {
    Director.findByIdAndDelete(
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

exports.addDirector = (directorName) => {
  Director.findOne({ name: directorName.name }, (err, director) => {
    if (err) {
      console.log("failed");
    } else {
      if (director === null) {
        const director = new Director({ name: directorName.name, profilePath: directorName.profile_path, id: directorName.id });
        director
          .save(director)
          .then((data) => {
            console.log(data)
            return data._id
          })
          .catch((err) => {
            console.log(err);
          });
      }else {
        return director._id
      }
    }
  });
};