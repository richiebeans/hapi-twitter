//defining the plugin
exports.register = function(server, options, next){
  //Define routs
  server.route([
      // I am RECEIVING a post request
      {
        method: 'POST',
        path: '/users',
        handler: function(request, reply){
          var db = request.server.plugins['hapi-mongodb'].db;
          var user = request.payload.user;
          db.collection('users').insert(user, function(err, writeResult){
            reply(writeResult)
          })
        }
      }
    ]);
  next();
};

//Defining the descriptions of the plugin
exports.register.attributes = {
  name: 'users-routes',
  version: '0.0.1'
};