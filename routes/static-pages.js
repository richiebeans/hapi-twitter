//defining the plugin
exports.register = function(server, options, next){

  server.route([
      // I am RECEIVING a GET request
      {
        method: 'GET',
        path: '/',
        handler: function(request, reply){
          reply.view('index')
       }
      }
  ])

  server.route([
      // I am RECEIVING a GET request
      {
        method: 'GET',
        path: '/public/{path*}',
        handler: {
          directory: {
            path: 'public'
          }
        }
       }
  ])
  next();
};



exports.register.attributes = {
  name: 'static-pages-route',
  version: '0.0.1'
};



