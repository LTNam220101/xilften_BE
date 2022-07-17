const Category = require("../models/category");
const mongoose = require("mongoose");

exports.create = (req, res, next) => {
  if (!req.body) {
    res.status(400).send("Content is required");
    return;
  }
  const category = new Category({ ...req.body });

  category
    .save(category)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

exports.addCate = (cate) => {
  Category.findOne({ name: cate }, (err, category) => {
    if (err) {
      console.log("failed");
      return;
    } else {
      if (category === null) {
        const newCategory = new Category({ name: cate });
        newCategory
          .save(newCategory)
          .then((data) => {
            console.log(data)
            return data._id
          })
          .catch((err) => {
            console.log(err);
          });
      }else {
        return category._id
      }
    }
  });
};

exports.update = (req, res, next) => {
  const updateData = { ...req.body };
  Category.findByIdAndUpdate(
    mongoose.Types.ObjectId(req.query.id),
    updateData,
    { new: true },
    (err, Category) => {
      if (err) {
        res.json({
          result: "failed",
          message: err.message,
        });
      } else {
        res.json({
          result: "successed",
          data: Category,
          message: "Success",
        });
      }
    }
  );
};

exports.deleteCategory = (req, res, next) => {
  Category.findByIdAndDelete(
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

exports.getAll = (req, res, next) => {
  Category.find({}).exec((err, list)=>{
    if (err) {
      res.json({
        result: "failed",
        message: err.message,
      });
    } else {
      res.json({
        result: "successed",
        data: list,
        length: list.length,
        message: "Success",
      });
    }
  })
}