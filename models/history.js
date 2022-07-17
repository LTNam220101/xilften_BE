const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema({
  movie: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const History = mongoose.model("History", HistorySchema);

module.exports = History;
