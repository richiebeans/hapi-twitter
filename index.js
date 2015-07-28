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

// Any other dependencies 
var plugins = [
  {
    register: require('./routes/users.js') },

  //require mongoDB
  {
    register: require('hapi-mongodb'),
    options: {
      url: 'mongodb://127.0.0.1:27017/hapi-twitter',
      settings: {
        db: {
          native_parser: false
        }
      }
  }
}];

//starts server
server.register(plugins, function(err){
  //check error
  if (err) {
    throw err;
  }

  //start server
  server.start(function(){
    console.log('info', 'Server running at: ' + server.info.uri);
  });
});