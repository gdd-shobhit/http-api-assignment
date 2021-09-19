const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const responsenHandler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS,
  '/success': responsenHandler.success,
  '/badRequest': responsenHandler.badRequest,
  '/unauthorized': responsenHandler.unauthorized,
  '/forbidden': responsenHandler.forbidden,
  '/internal': responsenHandler.internal,
  '/notImplemented': responsenHandler.notImplemented,
  notFound: responsenHandler.notFound,
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);

  const acceptedType = request.headers.accept.split(',');
  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, params, acceptedType);
  } else {
    urlStruct.notFound(request, response, params, acceptedType);
  }
};

http.createServer(onRequest).listen(port);