import {DynamoDB} from "aws-sdk"
const db = new DynamoDB.DocumentClient();

exports.handler = async function(event){
    console.log("request",JSON.stringify(event,undefined,2));


    const params = {
      TableName: process.env.TABLE_NAME
    }

    const {Items} = db.scan(params).promise()
    console.log(Items)
    return Items 

    // return{
    //   statusCode:200,
    //   headers:{ "Content-Type": "text/plain"},
    //   body: `Hello from Product! You've hit ${event.path}\n`
    // };
  };