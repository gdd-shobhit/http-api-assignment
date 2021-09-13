const { json } = require("stream/consumers");

const users = {'id':1212,'id':1313};

const respondJSON = (request, response, status, object) => {

};

const respondJSONMeta = (request, response, status) => {

};

const getUsers = (request, response) => {
    const jsonString = JSON.parse(users);
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(jsonString);
    response.end();
};

const getUsersMeta = (request, response) => {

};

const updateUser = (request, response) => {

};

const notFound = (request, response) => {

};

const notFoundMeta = (request, response) => {

};

module.exports = {
  getUsers,
  getUsersMeta,
  updateUser,
  notFound,
  notFoundMeta,
};
