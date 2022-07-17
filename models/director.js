const mongoose = require("mongoose");

const DirectorSchema = new mongoose.Schema({
  name: { type: String, require: true },
  movieQuantity: { type: Number, default: 1 },
  id: { type: Number},
  profilePath: { type: String}
});

const Director = mongoose.model("Director", DirectorSchema);

module.exports = Director;
