var express = require('express');
var compression = require('compression')
var app = express();

// Define the port to run on
app.set('port', process.env.PORT);

app.use(express.static(__dirname));
app.use(compression());

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Listening on port ' + port);
});