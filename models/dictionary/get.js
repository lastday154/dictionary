"use strict";

const dynamoDb = require("../dynamodb");
const md5 = require("md5");

module.exports.get = (event, context, callback) => {
  const { word } = event.queryStringParameters;
  const params = {
    TableName: process.env.DICTIONARY_TABLE,
    Key: {
      id: md5(word)
    }
  };

  // fetch todo from the database
  dynamoDb.get(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { "Content-Type": "text/plain" },
        body: { error: true, message: "Couldn't fetch the item." }
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(
        result.Item || { message: `There is no defintion for '${word}'` }
      )
    };
    callback(null, response);
  });
};
