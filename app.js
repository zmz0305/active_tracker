var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var routes = require('./routes/index');
var users = require('./routes/users');
var mongoose = require('mongoose');
var userController = require('./models/userController');

var app = express();
var port = process.env.PORT || 3000;
var server = require('http').Server(app);
var io = require('socket.io')(server);
// mongoose.connect('mongodb://localhost/active_auth');
server.listen(port);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var spawn = require('child_process').spawn;


var valid_ids = {'E280 1160 6000 0205 0055 B8FC': 'Jerry Shim',
    "E200 329D C790 03F1 23AC 000F": 'Murtaza Haider',
'E200 329D C785 2031 23AB D480': 'Steve Martinez',
'E200 329D C78D 49F1 23AB F527': 'John Leach',

    'E200 329D C78D D131 23AB F744': 'David Koenig'
};

//'E280 1160 6000 0206 0FEB C00E': 'Price Shoemaker',

setInterval(function () {
    // child = spawn('ruby', [
    //     './ex_get_taglist.rb'
    // ]);
    child = spawn('python', ['./alien_mock_station.py']);
    child.stderr.on('data', function(data) {
        console.log(data.toString());
    });
    child.stdout.on('data', function (data) {
        console.log(data.toString());
        var ids = data.toString().split('\n');
        // userController.getUser(ids[0], function (result) {
        //     if(result.success){
        //         console.log(result);
        //         // console.log('Found valid match: ' + ids[0]);
        //         // io.emit('valid_user_detected', {'user_id': ids[0], 'user_name': valid_ids[ids[0]]});
        //     }
        // })

        for (i in ids) {
            for (j in valid_ids) {
                if (ids[i] == j) {
                    console.log('Found valid match: ' + ids[i] + ': ' + valid_ids[j]);
                    io.emit('valid_user_detected', {'user_id': ids[i], 'user_name': valid_ids[j]});
                    return;
                }
            }
        }
        console.log(ids);
    });
}, 2000);

module.exports = app;
