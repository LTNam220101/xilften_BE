const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
  },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Rating = mongoose.model("Rating", RatingSchema);

module.exports = Rating;
