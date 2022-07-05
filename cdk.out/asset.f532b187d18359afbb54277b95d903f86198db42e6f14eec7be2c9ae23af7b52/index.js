"use strict";

// functions/get/index.js
var import_aws_sdk = require("aws-sdk");
var db = new import_aws_sdk.DynamoDB.DocumentClient();
exports.handler = async function(event) {
  console.log("request", JSON.stringify(event, void 0, 2));
  const params = {
    TableName: process.env.TABLE_NAME
  };
  const { Items } = db.scan(params).promise();
  console.log(Items);
  return Items;
};
