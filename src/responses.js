const respond = (request, response, status, type, content) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(content);
  response.end();
};

const success = (request, response, params, acceptedType) => {
  const responseObject = {
    id: 'Success',
    message: 'This is a successful response',
  };

  if (acceptedType[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseObject.message}</message>`;
    responseXML = `${responseXML} <id>${responseObject.id}</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 200, acceptedType, responseXML);
  }

  return respond(request, response, 200, 'application/json', JSON.stringify(responseObject));
};

const badRequest = (request, response, params, acceptedType) => {
  const responseObject = {
    message: 'This request has the required parameters',
  };

  if (acceptedType[0] === 'text/xml') {
    if (!params.valid || params.valid !== 'true') {
      responseObject.message = 'Missing valid query parameter set to true';
      responseObject.id = 'Bad Request';

      let responseXML = '<response>';
      responseXML = `${responseXML} <message>${responseObject.message}</message>`;
      responseXML = `${responseXML} <id>${responseObject.id}</id>`;
      responseXML = `${responseXML} </response>`;

      return respond(request, response, 400, acceptedType, responseXML);
    }

    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseObject.message}</message>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 200, acceptedType, responseXML);
  }

  if (!params.valid || params.valid !== 'true') {
    responseObject.message = 'Missing valid query parameter set to true';
    responseObject.id = 'Bad Request';
    return respond(request, response, 400, 'application/json', JSON.stringify(responseObject));
  }

  return respond(request, response, 200, 'application/json', JSON.stringify(responseObject));
};

const unauthorized = (request, response, params, acceptedType) => {
  const responseObject = {
    message: 'This request has the required parameters',
  };

  if (acceptedType[0] === 'text/xml') {
    if (!params.loggedIn || params.loggedIn !== 'yes') {
      responseObject.message = 'Missing loggenIn query parameter set to yes';
      responseObject.id = 'Unauthorized';

      let responseXML = '<response>';
      responseXML = `${responseXML} <message>${responseObject.message}</message>`;
      responseXML = `${responseXML} <id>${responseObject.id}</id>`;
      responseXML = `${responseXML} </response>`;

      return respond(request, response, 401, acceptedType, responseXML);
    }

    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseObject.message}</message>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 200, acceptedType, responseXML);
  }

  if (!params.loggedIn || params.loggedIn !== 'yes') {
    responseObject.message = 'Missing loggenIn query parameter set to yes';
    responseObject.id = 'Unauthorized';
    return respond(request, response, 401, 'application/json', JSON.stringify(responseObject));
  }

  return respond(request, response, 200, 'application/json', JSON.stringify(responseObject));
};

const forbidden = (request, response, params, acceptedType) => {
  const responseObject = {
    message: 'You do not have access to this content.',
    id: 'Forbidden',
  };

  if (acceptedType[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseObject.message}</message>`;
    responseXML = `${responseXML} <id>${responseObject.id}</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 403, acceptedType, responseXML);
  }

  return respond(request, response, 403, 'application/json', JSON.stringify(responseObject));
};

const internal = (request, response, params, acceptedType) => {
  const responseObject = {
    message: 'Internal Server Error. Something went wrong',
    id: 'Internal Server Error',
  };

  if (acceptedType[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseObject.message}</message>`;
    responseXML = `${responseXML} <id>${responseObject.id}</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 500, acceptedType, responseXML);
  }

  return respond(request, response, 500, 'application/json', JSON.stringify(responseObject));
};

const notImplemented = (request, response, params, acceptedType) => {
  const responseObject = {
    message: 'A get request for this page has not been implement yet. Check again later for updated content.',
    id: 'Not Implemented',
  };

  if (acceptedType[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseObject.message}</message>`;
    responseXML = `${responseXML} <id>${responseObject.id}</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 501, acceptedType, responseXML);
  }

  return respond(request, response, 501, 'application/json', JSON.stringify(responseObject));
};

const notFound = (request, response, params, acceptedType) => {
  const responseObject = {
    message: 'The page you are looking for was not found.',
    id: 'Resource Not Found',
  };

  if (acceptedType[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseObject.message}</message>`;
    responseXML = `${responseXML} <id>${responseObject.id}</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 404, acceptedType, responseXML);
  }

  return respond(request, response, 404, 'application/json', JSON.stringify(responseObject));
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
