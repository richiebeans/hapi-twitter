var Auth = require('./auth');
var Joi = require('joi');

exports.register = function(server, options, next){
  server.route([
    // Get all tweets;
    {
      method: 'GET',
      path: '/tweets',
      handler: function(request, reply){ 
        var db = request.server.plugins['hapi-mongodb'].db;

        db.collection('tweets').find().toArray(function(err, tweets){
          if(err) {
            return reply ("Internal MongoDB error", err)
          }
          reply (tweets);
        });
      }
    },    

    //get one tweet
    {
      method: 'GET',
      path: '/tweets/{id}',
      handler: function(request, reply){ 
        var tweet_id = encodeURIComponent(request.params.id)
        var db = request.server.plugins['hapi-mongodb'].db;
        var ObjectId = request.server.plugins ['hapi-mongodb'].ObjectID;

        db.collection('tweets').findOne(
          {"_id": ObjectId(tweet_id)}, function(err, tweets){
            if(err) {
              return reply ("Internal MongoDB error", err)
            }
            reply (tweets);
        });
      }
    },
    
    //Create twwet
    {
      method: 'POST',
      path: '/tweets',
      config: {
        handler: function(request, reply){
          Auth.authenticated(request, function(result){
            if (result.authenticated) {
              var db        = request.server.plugins['hapi-mongodb'].db;
   
              var tweet = {
                "message": request.payload.tweet.message,
                // "date": new Date(); // Let's do this when we have the front end
                "user_id": result.user_id
              };

              db.collection('tweets').insert(tweet, function(err, writeResult){
                if(err) {return reply("Internal MongoDB error", err)
                };
                reply (writeResult);
              });

            } else {
              reply(result.message);
            }
          })
        },
        validate: {
          payload: {
            tweet: {
              message: Joi.string().min(1).max(140).required()
            }
          }
        }
      }
    }
  ]);
  next();
};

//Defining the descriptions of the plugin
exports.register.attributes = {
name: 'tweets-route',
version: '0.0.1'
};
