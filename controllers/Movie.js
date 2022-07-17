const Movie = require("../models/movie");
const CategoryController = require("./Category");
const ActorController = require("./Actor");
const DirectorController = require("./Director");

const mongoose = require("mongoose");

exports.create = (req, res, next) => {
  if (!req.body) {
    res.status(400).send("Content is required");
    return;
  }
  console.log(req.body)
  let movie = {};
  let categories = [];
  const actors = req.body.actors.map(item=>item);
  // let director = "";
  const abc = async () => {
    await req.body.categories.map((cate) => {
      CategoryController.addCate(cate);
    });
    console.log(categories)
    await req.body.actors.map((actor) => {
      ActorController.addActor(actor);
    });
    // Array.from(new Array(1)).map(() => {
    // director = await DirectorController.addDirector(req.body.directors)
    // });
    // const newMovie = {...movie, categories, actors, director};
  }
  abc().then(() => {movie = new Movie({ ...req.body, actors})}).then(
    ()=>{
      movie
        .save(movie)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send(err.message);
        });
    }
  );
  // console.log(newMovie)
};

exports.getDetailMovie = (req, res, next) => {
  Movie.findById(mongoose.Types.ObjectId(req.params.id), (err, movie) => {
    console.log(req.params.id);
    if (err) {
      res.json({
        result: "failed",
        message: err.message,
      });
    } else {
      res.json({
        result: "successed",
        data: movie,
        message: "Success",
      });
    }
  });
};

exports.update = (req, res, next) => {
  console.log(req)
  const updateData = { ...req.body };
  Movie.findByIdAndUpdate(
    mongoose.Types.ObjectId(req.params.id),
    updateData,
    {new: true},
    (err, movie) => {
      if (err) {
        res.json({
          result: "failed",
          message: err.message,
        });
      } else {
        res.json({
          result: "successed",
          data: movie,
          message: "Success",
        });
      }
    }
  );
};

exports.deleteMovie = (req, res, next) => {
  Movie.findByIdAndDelete(
    mongoose.Types.ObjectId(req.params.id),
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

exports.updateRating = (movie, rating) => {
  console.log(movie);
  console.log(mongoose.Types.ObjectId(movie));
  Movie.findById(movie, (err, movie) => {
    if (err) {
      console.log("failed");
    } else {
      const quantity = movie.ratingQuantity;
      const average = movie.ratingAverage;
      Movie.findByIdAndUpdate(
        movie,
        {
          ratingQuantity: quantity + 1,
          ratingAverage: (
            (average * quantity + rating) /
            (quantity + 1)
          ).toFixed(1),
        },
        { new: true },
        (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("ok");
          }
        }
      );
    }
  });
};

exports.getListMoviesById = (req, res, next) => {
  console.log("req: ", req);
  Movie.findById({ $in: req }, (err, list) => {
    if (err) {
      res.json({
        result: "failed",
        message: err.message,
      });
    } else {
      res.json({
        result: "successed",
        data: list,
        length: list === null ? 0 : list.length,
        message: "Success",
      });
    }
  });
};

exports.getListMovies = (req, res, next) => {
  Movie.find({ name: { $in: req } }).exec((err, list) => {
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
  });
};

exports.getAllMovies = (req, res, next) => {
  Movie.find({})
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
};

exports.getMovieByCategory = (req, res, next) => {
  const query = req.query.category;
  const regex = new RegExp(query, "i");
  Movie.find({ categories: { $regex: regex } }).exec((err, list) => {
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
  });
};

exports.getMovieByActor = (req, res, next) => {
  const query = req.query.actor;
  const regex = new RegExp(query, "i");
  Movie.find({ actors: { $regex: regex } }).exec((err, list) => {
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
  });
};

exports.getMovieByDirector = (req, res, next) => {
  const query = req.query.director;
  const regex = new RegExp(query, "i");
  Movie.find({ director: { $regex: regex } }).exec((err, list) => {
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
  });
};
