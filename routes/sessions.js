var Bcrypt = require('bcrypt');
var Auth = require('./auth');

exports.register = function(server, options, next){

  server.route([
    {
      //create session
      method:'POST',
      path: '/sessions',
      handler: function(request, reply){
        var db = request.server.plugins['hapi-mongodb'].db;
        var user = request.payload.user;

        db.collection('users').findOne({username: user.username}, function(err, userMongo){
          // 1. Does user exist
          if (err) {return reply("Internal MongoDB error", err)}
                 
          if (userMongo === null){
            return reply({ userExists: false }); 
          }        
          //2. check password
          Bcrypt.compare(user.password, userMongo.password, function(err, same){
            if(!same) {
              return reply({ authorized: false });
            }

          })
          //3. create new session in the sessions collection
          var randomKeyGenerator = function() { // creates random num
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
          };

          var session = {
            user_id: userMongo._id,
            session_id: randomKeyGenerator()
          }

          db.collection('sessions').insert(session, function(err, writeResult){
  
          //4. Set the same session_id in the CLIENT's cookie.
          request.session.set('hapi_twitter_session', session);

          reply({ authorized: true}); 
        });
      });
     } 
    },
    {
      // defining a route to check if the user is authenticated/logged in
      method: 'GET',
      path:'/authenticated',
      handler: function(request,reply){
        //usually logic goes here, however in this case we are going to write it in a place where other routes can use this method.
        var callback = function(result){
            reply(result);
        };
        Auth.authenticated(request, callback);
      }
    }
  ]);

  next();
};

  exports.register.attributes = {
  name: 'sessions-route',
  version: '0.0.1'
};