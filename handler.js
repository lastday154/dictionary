"use strict";

const { getDictionary } = require("./libs/word");
const { batchInsert } = require("./models/dictionary/batchInsert");

module.exports.createDictionary = async (event, context, callback) => {
  try {
    const data = await getDictionary();
    await batchInsert({
      list: data
    });
    const response = {
      statusCode: 200,
      body: JSON.stringify(data)
    };
    callback(null, response);
  } catch (err) {
    console.log(err);
    callback(null, {
      statusCode: err.statusCode || 501,
      headers: { "Content-Type": "text/plain" },
      body: { error: true, message: "Couldn't create the  dictionary." }
    });
  }
};
