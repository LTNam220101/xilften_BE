const Rating = require("../models/rating");
const MovieController = require("./Movie");
const mongoose = require("mongoose");

exports.create = (req, res, next) => {
  if (!req.body) {
    res.status(400).send("Content is required");
    return;
  }
  const rating = new Rating({ ...req.body });

  rating
    .save(rating)
    .then((data) => {
      MovieController.updateRating(data.movie, data.rating);
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

exports.find = (req, res, next) => {
    Rating.findById(mongoose.Types.ObjectId(req.query.id), (err, rating) => {
    console.log(req.query.id);
    if (err) {
      res.json({
        result: "failed",
        message: err.message,
      });
    } else {
      res.json({
        result: "successed",
        data: rating,
        message: "Success",
      });
    }
  });
};

// exports.update = (req, res, next) => {
//   const updateData = { ...req.body };
//   Rating.findByIdAndUpdate(
//     mongoose.Types.ObjectId(req.query.id),
//     updateData,
//     { new: true },
//     (err, rating) => {
//       if (err) {
//         res.json({
//           result: "failed",
//           message: err.message,
//         });
//       } else {
//         res.json({
//           result: "successed",
//           data: rating,
//           message: "Success",
//         });
//       }
//     }
//   );
// };
