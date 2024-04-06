require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const foodsRouter = require('./routes/foods');
const gridRouter = require('./routes/grid');
const Food = require("./models/foods"); // Assuming your food model is named Food

const resourceRouter = require('./routes/resource');
const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/foods', foodsRouter);
app.use('/grid', gridRouter);
app.use('/resource',resourceRouter)

app.get('/randomitem', function (req, res) {
  res.render('randomitem', { title: 'A random item' });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const connectionString = process.env.MONGO_CON;
mongoose.connect(connectionString);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function(){
  console.log("Connection to DB succeeded");
});

async function recreateDB() {
  await Food.deleteMany();
  let instance1 = new Food({ foodName: "biryani", category: 'large', price: 150 });
  let instance2 = new Food({ foodName: "pullav", category: 'small', price: 125 });
  let instance3 = new Food({ foodName: "haleem", category: 'extralarge', price: 200 });

  try {
    await instance1.save();
    console.log("First object saved");
    await instance2.save();
    console.log("Second object saved");
    await instance3.save();
    console.log("Third object saved");
  } catch (error) {
    console.error(error);
  }
}

const reseed = true;
if (reseed) {
  recreateDB();
}

module.exports = app;
