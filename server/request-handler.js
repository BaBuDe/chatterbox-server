var messages = [];
var url = {};

module.exports.handler = function(request, response) {
  var headers = defaultCorsHeaders;
  var statusCode = 200;

//option2
// module.exports = function handleRequest(request,response) {

//???
  headers['Content-Type'] = 'application/json';

  /* .writeHead() tells our server what HTTP status code to send back */

  console.log("Serving request type " + request.method + " for url " + request.url);

  if (request.method === 'GET') {

    //return 200 on success (if within url object)
    //return 404 on failure (if not in url object)
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
      //response.end(JSON.stringify(message));
      //if URL does not exist
      if (!url[request.url]) {
        //add incoming request URL to storage object
        url[request.url] = true;
        statusCode = 201;
        console.log(statusCode);
      }
    });
  };
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
