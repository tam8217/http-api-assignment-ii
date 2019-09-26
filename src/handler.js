// Setting up HTML pages
const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

// Storing users
const users = {};

// Retrieving index page
const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

// Getting the CSS
const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

// Sending out an object
const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

// Writing meta data out
const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });

  response.end();
};

// Retrieving the users
const getUsers = (request, response) => {
  const tempObj = { users };

  respondJSON(request, response, 200, tempObj);
};

// Getting successful request meta data
const getUsersHead = (request, response) => {
  respondJSONMeta(request, response, 200);
};

const notFound = (request, response) => {
  // Create JSON to hold message and error
  const tempObj = {
    message: 'The page you are looking for was not found',
    id: 'notFound',
  };

  // Send back object and 404 status code
  respondJSON(request, response, 404, tempObj);
};

const notFoundHead = (request, response) => {
  // Send back 404
  respondJSONMeta(request, response, 404);
};

const addUser = (request, response, userData) => {
  // Create an object hold message
  const tempObj = {
    message: 'Name and age are both required',
  };

  // Checking parameters of the incoming userdata
  if (!userData.name || !userData.age) {
    tempObj.id = 'missingParams';
    return respondJSON(request, response, 400, tempObj);
  }

  // Status code for creating an item
  let statusCode = 201;

  // If spot already exists, set it to update
  if (users[userData.name]) {
    statusCode = 204;
  } else {
    users[userData.name] = {};
  }

  // Assign values
  users[userData.name].name = userData.name;
  users[userData.name].age = userData.age;

  // Send back message with response if the user is created
  if (statusCode === 201) {
    tempObj.message = 'Created new user successfully!';

    return respondJSON(request, response, statusCode, tempObj);
  }

  // Sending back meta data if user is updated
  return respondJSONMeta(request, response, statusCode);
};


module.exports = {
  getIndex,
  getCSS,
  getUsers,
  getUsersHead,
  notFoundHead,
  addUser,
  notFound,
};
