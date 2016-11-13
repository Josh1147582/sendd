var express = require('express');
var router = express.Router();

var FileSaver = require('file-saver');

/* PeerServer */
var app = express();
var ExpressPeerServer = require('peer').ExpressPeerServer;

// app.get('/', function(req, res, next) { res.send('Hello world!'); });

var server = require('http').createServer(app);

var options = {
    debug: true
}

app.use('/node_modules/peerjs', ExpressPeerServer(server, options));

server.listen(9000);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/send', function(req, res, next) {
  res.render('send');
});

router.get('/receive', function(req, res, next) {
  res.render('receive');
});

module.exports = router;
