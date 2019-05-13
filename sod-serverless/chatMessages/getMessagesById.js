'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const params = {
  TableName: process.env.MESSAGES_TABLE,
};

module.exports.get = (event, context, callback) => {
 
    dynamoDb.scan(params, (error, result) => {
    
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the chat messages.',
      });
      return;
    }
    let data = result.Items;
    let id = event.pathParameters.id;

    console.log(data);

    let chatObject = [];

    data.forEach((item) => {
        if(id === item.chatID){
            chatObject.push(item);
        }
    });
    console.log(chatObject);

    // create a response
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(chatObject),
    };
    callback(null, response);
  });
};
