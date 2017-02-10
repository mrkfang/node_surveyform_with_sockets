// require express
var express = require("express");
// path module -- try to figure out where and why we use this
var path = require("path");
// create the express app
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
// static content
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render("index");
})

app.post('/result', function(req, res) {
 console.log("POST DATA: \n", req.body);
 var context = [];
 context.push(req.body)

 res.render('results', {lol: context});
})

var server = app.listen(8000, function() {
 console.log("listening on port 8000");
});

var io = require('socket.io').listen(server);

// Whenever a connection event happens (the connection event is built in) run the following code
io.sockets.on('connection', function (socket) {
  console.log("WE ARE USING SOCKETS!");
  console.log("User ID connected: " + socket.id);

  socket.on("posting_form", function (data){
    console.log('Form has been submitted!');
    var newObj = data
    for (var item in newObj){
      console.log(newObj[item])
    }
    var randObj = {
      key : Math.floor( Math.random() * 1000 )
    }
    socket.emit('server_response', newObj);
    socket.emit('sent_random_number', randObj);
  })
  //all the socket code goes in here!
})
