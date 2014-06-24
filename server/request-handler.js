var messages = [];

module.exports.handleRequest = function(request, response) {
  var headers = defaultCorsHeaders;
  var statusCode = 200;

  headers['Content-Type'] = 'application/json';

  response.end();
  /* .writeHead() tells our server what HTTP status code to send back */
  response.writeHead(statusCode, headers);
//option2
// module.exports = function handleRequest(request,response) {

  console.log("Serving request type " + request.method + " for url " + request.url);

  if (request.method === 'GET') {
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify({results: messages}));
  } else if (request.method === 'POST') {
      var data = '';
    request.on('data', function(chunk){
      data += chunk;
    });
    request.on('end', function(){
      var message = JSON.parse(data);
      messages.push(message);
      response.end(JSON.stringify(message));
    });
  }
};



/* These headers will allow Cross-Origin Resource Sharing (CORS).
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
