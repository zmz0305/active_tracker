var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');





var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var port = process.env.PORT || 3000;
var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(port);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var spawn = require('child_process').spawn;


var valid_ids = {'E280 1160 6000 0205 0055 B8FC' : 'Jerry Shim'};

setInterval(function () {
  child = spawn('ruby', [
    './ex_get_taglist.rb'
  ]);
  child.stdout.on('data', function(data) {
    ids = data.toString().split('\n')
    for(i in ids){
      for(j in valid_ids){
        if(ids[i] == j){
          console.log('Found valid match: ' + ids[i] + ': ' + valid_ids[j]);
          io.emit('valid_user_detected', {'user_id': ids[i], 'user_name': valid_ids[j]});
          return;
        }
      }
    }
    // console.log(ids);
  });
}, 2000);

module.exports = app;
