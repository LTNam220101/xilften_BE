const User = require("../models/user");
const MovieController = require("./Movie");
const mongoose = require("mongoose");

exports.create = async(req, res, next) => {
  if (!req.body) {
    res.status(400).send("Content is required");
    return;
  }
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    history: [],
  });

  user
    .save(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

exports.getAllUsers = (req, res) => {
  User.find({})
  .limit(100)
  .exec((err, list) => {
    if (err) {
      res.json({
        result: "failed",
        message: err.message,
      });
    } else {
      res.json(list);
    }
  });
}

exports.find = (req, res, next) => {
  User.findById(mongoose.Types.ObjectId(req.params.id), (err, user) => {
    console.log(req.params.id);
    if (err) {
      res.json({
        result: "failed",
        message: err.message,
      });
    } else {
      res.json({
        result: "successed",
        data: user,
        message: "Success",
      });
    }
  });
};

exports.update = (req, res, next) => {
  const updateData = { ...req.body };
  User.findByIdAndUpdate(
    mongoose.Types.ObjectId(req.body.id),
    updateData,
    { new: true },
    (err, user) => {
      if (err) {
        res.json({
          result: "failed",
          message: err.message,
        });
      } else {
        res.json({
          result: "successed",
          data: user,
          message: "Success",
        });
      }
    }
  );
};

exports.deleteUser = (req, res, next) => {
  User.findByIdAndDelete(
    mongoose.Types.ObjectId(req.query.id),
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
          message: "Success",
        });
      }
    }
  );
};

exports.getListMovies = (req, res, next) => {
  User.findOne({email: req.body.email}).exec((err, user) => {
    console.log(req.body.email);
    if (err) {
      res.json({
        result: "failed",
        message: err.message,
      });
    } else {
      console.log(user.history)
      MovieController.getListMovies(user.history, res, next);
    }
  });
};

exports.addToFavorite = (req, res, next) => {
  User.findOne({email: req.body.email}).exec((err, user) => {
    if (err) {
      res.json({
        result: "failed",
        message: err.message,
      });
    } else {
      let history = user.history;
      if(history.includes(req.body.id)) {
        history = history.filter(item => {
          return String(item) !== req.body.id
      })
      }else {
        history.push(req.body.id)
      }
      User.findByIdAndUpdate(
        mongoose.Types.ObjectId(user._id),
        {history: history},
        { new: true },
        (err, user) => {
          if (err) {
            res.json({
              result: "failed",
              message: err.message,
            });
          } else {
            res.json({
              result: "successed",
              data: user,
              message: "Success",
            });
          }
        }
      );
    }
  });
}

exports.login = (req, res, next) => {
  const { name, email } = req.body;
  try {
    User.findOne({ name, email }).exec((err, user) => {
      if (user) {
        res.json({
          result: "successed",
          data: user,
          message: "login successfully",
        });
      } else {
        res.json({
          result: "failed",
          message: "login failed, check name and email",
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

exports.function_register_users = async(obj) => {
  //insert vao collection Users
  return User.create(obj);
}