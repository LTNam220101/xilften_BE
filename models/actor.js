const mongoose = require("mongoose");

const ActorSchema = new mongoose.Schema({
  name: { type: String, require: true },
  image: {
    type: String
  },
});

const Actor = mongoose.model("Actor", ActorSchema);

module.exports = Actor;
