module.exports = {};
  //var Auth = {}, creates connection

//Defining the function
// Auth.authenticated = ...
  module.exports.authenticated = function(request, callback){
    //return true if user is logged in
    // return false if user is not logged in

    // 1. retreive session_id from cookie
      var cookie = request.session.get('hapi_twitter_session');
      
      if (!cookie) {
        return callback({ authenticated: false, message: "No Beuno" });
      }

      var session_id = cookie.session_id;

    // 2. look into the DB to find matching session_id
      var db = request.server.plugins['hapi-mongodb'].db

      db.collection('sessions').findOne({session_id: session_id}, 
        function(err, session){
    // 3. return true /false
        if (!session) {
          return callback({ authenticated: false, message: "No Beuno"});
        }
         
         callback({ authenticated: true, user_id: session.user_id}); 
      });
  };
