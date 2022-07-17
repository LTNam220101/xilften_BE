const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  company: {
    type: String,    
    default: "ABC",
  },
  descriptions: {
    type: String,
    required: true,
  },
  ratingAverage: {
    type: Number,
    default: 5,
  },
  ratingQuantity: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  categories: [
    {
      type: String,
    },
  ],
  actors: [{type: String }],
  // directors: { type: mongoose.Schema.Types.ObjectId, ref: "Director" },
  voteAverage: { type: Number },
  voteQuantity: { type: Number },
});

const Movie = mongoose.model("Movie", MovieSchema);

module.exports = Movie;
