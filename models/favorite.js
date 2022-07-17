const mongoose = require("mongoose");

const FavoriteSchema = new mongoose.Schema({
  movie: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Favorite = mongoose.model("Favorite", FavoriteSchema);

module.exports = Favorite;
