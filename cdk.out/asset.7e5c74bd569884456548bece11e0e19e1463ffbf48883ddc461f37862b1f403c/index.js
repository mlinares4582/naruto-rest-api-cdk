"use strict";

// functions/get/index.js
var import_aws_sdk = require("aws-sdk");
var db = new import_aws_sdk.DynamoDB.DocumentClient();
exports.handler = async function(event) {
  console.log("request", JSON.stringify(event, void 0, 2));
  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: `Hello from Product! You've hit ${event.path}
`
  };
};
