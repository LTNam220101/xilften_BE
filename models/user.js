const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  history: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],

  deleteAt: { type: Date, default: Date.now},
  createAt: { type: Date, default: Date.now},
  updateAt: { type: Date, default: Date.now},
  action: { type: String, default: 'System'},
  
  loginAt: { type: Date, default: Date.now},
  logoutAt: { type: Date, default: Date.now},
  action: { type: String, default: 'System'},
});

UserSchema.index({ email: 1}) //Nơi đánh index
const User = mongoose.model("User", UserSchema);

module.exports = User;
