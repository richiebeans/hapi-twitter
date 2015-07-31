//Hapi is class
var Hapi = require('hapi');
var Path = require('path');

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


server.views({
  engines: {
    html: require('handlebars')
  },
  path: Path.join(__dirname, 'templates') //hapi-twitter/templates
});

// Any other dependencies 
var plugins = [
  { register: require('./routes/static-pages.js') },
  { register: require('./routes/users.js') },
  { register: require('./routes/sessions.js') },
  { register: require('./routes/tweets.js') },
  { register: require('yar'),
    options:{
      cookieOptions: {
        password: 'asasdasd',
        isSecure: false// we are not going to use https, yet, for development
      }
    }
  },

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
    console.log('info', 'Server running at: ' + server.info.url);

  });
});