var restify = require('restify'),
    mongoose = require('mongoose');


var dbConfig = require(__dirname + '/config/database.js'),
	routes = require(__dirname + '/app/routes.js');

var port = Number(process.env.PORT || 5000);
var apiServer = restify.createServer();
apiServer.use(restify.fullResponse()).use(restify.bodyParser());

mongoose.connect(dbConfig.url);
mongoose.connection.on('disconnected', function ()
{
	console.log('Connection to db lost...');
});

routes(apiServer);

apiServer.listen(port, function() {
  console.log(apiServer.name + ' listening at ' + apiServer.url);
});
