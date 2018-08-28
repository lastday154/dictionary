"use strict";

const dynamoDb = require("../dynamodb");
async function batchInsert({ list, chunkSize = 25 }) {
  const emptyList = new Array(Math.ceil(list.length / chunkSize)).fill();
  const clonedList = list.slice(0);
  const chunks = emptyList.map(_ => clonedList.splice(0, chunkSize));
  for (let chunk of chunks) {
    await writeItems(chunk, chunks);
  }
}

async function writeItems(chunk, chunks) {
  const params = {
    RequestItems: {}
  };
  params.RequestItems[process.env.DICTIONARY_TABLE] = chunk.map(item => {
    return { PutRequest: { Item: item } };
  });
  const { UnprocessedItems } = await dynamoDb.batchWrite(params).promise();
  if (UnprocessedItems.length) {
    chunks.push(UnprocessedItems);
  }
}

module.exports = {
  batchInsert
};
