var messages = [];
var url = {};
var url = require("url");


/* These headers will allow Cross-Origin Resource Sharing (CORS).
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
//???
  "Content-Type": "application/json"
};

var headers = defaultCorsHeaders;
//collectData
var collectData = function(request){
  var data = '';
  request.on('data', function(chunk){
    data += chunk;
  });
  request.on('end', function(){
    var message = JSON.parse(data);
  messages.unshift(message);
  });
};

//sendResponse
var sendResponse = function(response, data, statusCode){
  statusCode = statusCode || 200;
  /* .writeHead() tells our server what HTTP status code to send back */
  console.log(headers);
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(data));
};


module.exports.handler = function(request, response) {
//option2
// module.exports = function handleRequest(request,response) {
  console.log("Serving request type " + request.method + " for url " + request.url);

  if (request.method === 'OPTIONS') {
    sendResponse(response, {});
  } else if (request.method === 'GET') {
    //On default return 200 on success (if within url object)
    //return 404 on failure (if not in url object)
    var path = url.parse(request.url).pathname.slice(0,9);
    if (path === '/classes/') {
      sendResponse(response, {results: messages});
    } else {
      sendResponse(response, {results: []}, 404);
    }
  } else if (request.method === 'POST') {
   collectData(request);
   sendResponse(response, messages[0], 201);
  }
};




exports.sendResponse = sendResponse;
exports.collectData = collectData;
