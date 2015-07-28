//Hapi is class
var Hapi = require('hapi');

// Instantiate
var server = new Hapi.Server();

// configure server connections
server.connection({
  host: 'localhost', 
  port: 3000,
  routes: {
    cors: {
      headers: ["Access-Control-Allow-Credentials"],
      credentials: true
    }
  }
});

// Require MongoDB
var plugins = [];

//starts server
server.register(plugins, function(err){
  //check error
  if (err) {
    throw err;
  }

  //start server
  server.start(function(){
    console.log('info', 'Server running at: ' + server.info.url);
  });
});