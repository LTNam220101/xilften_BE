const Shelf = require("../models/history");
const MovieController = require("./Movie");
const mongoose = require("mongoose");

exports.create = (req, res, next) => {
  if (!req.body) {
    res.status(400).send("Content is required");
    return;
  }
  const shelf = new Shelf({ ...req.body });

  shelf
    .save(shelf)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

exports.findByUser = (req, res, next) => {
  Shelf.findOne({ user: { _id: req.body.user } }, (err, shelf) => {
    console.log(req.body.user);
    console.log(shelf);
    if (err) {
      res.json({
        result: "failed",
        message: err.message,
      });
    } else {
      MovieController.getListMoviesById(shelf.movie, res)
    }
  });
};

// exports.update = (req, res, next) => {
//   const updateData = { ...req.body };
//   Shelf.findByIdAndUpdate(
//     mongoose.Types.ObjectId(req.query.id),
//     updateData,
//     { new: true },
//     (err, shelf) => {
//       if (err) {
//         res.json({
//           result: "failed",
//           message: err.message,
//         });
//       } else {
//         res.json({
//           result: "successed",
//           data: shelf,
//           message: "Success",
//         });
//       }
//     }
//   );
// };

exports.deleteFromShelf = (req, res, next) => {
  Shelf.findOneAndDelete(
    { user: { _id: req.query.user } },
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
