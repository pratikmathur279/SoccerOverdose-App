'use strict';
console.log('reached1');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();
console.log('reached2');

module.exports.check = (event, context, callback) => {
  const params = {
    TableName: process.env.USERS_TABLE,
  };

console.log(event.pathParameters.user);

  // fetch todo from the database
  dynamoDb.scan(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the todo item.',
      });
      return;
    }

    let exists = false;
    // console.log(result.Items);
    const data = (result.Items);
    console.log(data.length);
    data.forEach((element) => {
      if(element.username == event.pathParameters.user){
          exists = true;
      }
    })
    console.log(exists);
    // create a response
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      },
      body: exists,
    };
    callback(null, response);
  });
};
