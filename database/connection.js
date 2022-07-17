const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const con = mongoose.connect(
      "mongodb+srv://namluong:namluong@cluster0.13t02.mongodb.net/XilftenMovie?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;