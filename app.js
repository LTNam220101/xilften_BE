const createError = require("http-errors");
global.express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const connectDB = require("./database/connection");
const serverless = require("serverless-http")
// import crud, { sequelizeCrud } from 'express-sequelize-crud'
const crud = require("express-crud-router");
const sequelizeCrud = require("express-crud-router-sequelize-v6-connector/lib/index.js");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const movieRouter = require("./routes/movie");
const categoryRouter = require("./routes/category");
const ratingRouter = require("./routes/rating");
const shelfRouter = require("./routes/shelf");
const actorRouter = require("./routes/actor");
const directorRouter = require("./routes/director");

const Movie = require("./models/movie");

const index = require('./controllers/')
const middleware = require('./utils/middeware')

const app = express();
app.use(cors());

const router = express.Router()

connectDB();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/user", usersRouter);
app.use("/movie", movieRouter);
app.use("/category", categoryRouter);
app.use("/rating", ratingRouter);
app.use("/shelf", shelfRouter);
app.use("/actor", actorRouter);
app.use("/director", directorRouter);
app.route('/login').get(index.login).post(index.login)
app.route('/profile').post([middleware.checkLogin, index.profile])

// app.use(crud("/movie", sequelizeCrud(Movie)));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports.handler = serverless(app);
