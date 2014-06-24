var messages = [];
var url = {};

module.exports.handler = function(request, response) {
  var headers = defaultCorsHeaders;
  var statusCode = 200;

  headers['Content-Type'] = 'application/json';

  /* .writeHead() tells our server what HTTP status code to send back */
//option2
// module.exports = function handleRequest(request,response) {

  console.log("Serving request type " + request.method + " for url " + request.url);

  if (request.method === 'GET') {
    //return 200 on success (if within url object)
    //return 404 on failure (if not in url object)
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify({results: messages}));
  } else if (request.method === 'POST') {
    //parse request.url to see if url exists within url object
    //if it does not exist, add it to the url object (201)
      var data = '';
    request.on('data', function(chunk){
      data += chunk;
    });
    request.on('end', function(){
      var message = JSON.parse(data);
      messages.push(message);
      // response.end(JSON.stringify(message));
    });
    console.log(messages);
  }
  response.writeHead(statusCode, headers);
  response.end();
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
