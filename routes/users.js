//defining the plugin
exports.register = function(server, options, next){

next();
};

//Defining the descriptions of the plugin
exports.register.attributes = {
  name: 'users-routes',
  version: '0.0.1'
};