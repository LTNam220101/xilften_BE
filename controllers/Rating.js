const Rating = require("../models/rating");
const MovieController = require("./Movie");
const Movie = require("../models/movie");
const mongoose = require("mongoose");

exports.create = (req, res, next) => {
  if (!req.body) {
    res.status(400).send("Content is required");
    return;
  }
  const rating = new Rating({ ...req.body.rating });

  rating
    .save(rating)
    .then((data) => {
      console.log(data)
      Movie.findById(data.id, (err, movie) => {
        if (err) {
          console.log("failed");
        } else {
          const quantity = movie.ratingQuantity;
          const average = movie.ratingAverage;
          Movie.findByIdAndUpdate(
            movie,
            {
              ratingQuantity: quantity + 1,
              ratingAverage: (
                (average * quantity + data.rating) /
                (quantity + 1)
              ).toFixed(1),
            },
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
                  data: movie,
                  message: "Success",
                });
              }
            }
          );
        }
      });
    })
  }

exports.find = (req, res, next) => {
    const { id, email } = req.body
    try{
      Rating.findOne({ id, email }).exec((err, rating) => {
      console.log(req.body);
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
    } catch (err) {
      res.json({
        result: "failed",
        message: err,
      });
    }
};