// app.js  ─ root of the project
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// NEW – Handlebars helper
const hbs = require('hbs');

const indexRouter = require('./app_server/routes/index');   
const travelRouter = require('./app_server/routes/travel');      
var apiRouter = require('./app_api/routes/index');     

require('./app_api/models/db'); 

const app = express();

app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

// NEW – register the partials folder with Handlebars
hbs.registerPartials(
  path.join(__dirname, 'app_server', 'views', 'partials')
);                                         // 
// ────────────────────────────────────────────────

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ────────────────────────────────────────────────
// routes
app.use('/', indexRouter);
app.use('/travel', travelRouter);
// app.use('/users', usersRouter);         
app.use('/api', apiRouter);            


// catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)));

// error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;