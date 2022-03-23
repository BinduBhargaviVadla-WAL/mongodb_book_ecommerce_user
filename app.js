var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

//mongoose is a JS library used to make connection between mongoDB and Express application
const mongoose = require("mongoose");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var hobbyRouter = require("./routes/hobby");

var app = express();

// Here we are defining the url connection to mongodb
let mongoConnUrl = "mongodb://localhost/march22";
// through the mongoose we are connected the mongodb to express
mongoose.connect(mongoConnUrl, { useNewUrlparser: true });
//if it is connected we get the connection pointer here
let db = mongoose.connection;
//during conncection is turned on it checks if there is error it shows the below mentioned lines
db.on("error", function (error) {
  console.log("Unable to connect to the mongodb");
  console.log(error);
});
// connection is on if it is open to make changes to mongodb like insert get it shows the message we passed
db.on("open", function () {
  console.log("We are connected to mongodb via mongoose");
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/hobby", hobbyRouter);

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

module.exports = app;
