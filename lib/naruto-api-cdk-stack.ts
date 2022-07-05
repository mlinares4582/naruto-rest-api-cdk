import { Stack, StackProps } from 'aws-cdk-lib';
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import { join } from 'path';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

export class NarutoApiCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const narutoTable = new Table(this,'table-naruto',{
      partitionKey: { name: "id", type: AttributeType.STRING },
      tableName: "Table-Naruto"
      
    });

    const getShinobiLambdaFunction = new NodejsFunction(this, 'getAllLambdaNarutoFunction', {
      entry: join(__dirname, '../functions/get/index.js'),
      functionName: 'get-all-naruto-function',
      bundling:{
        externalModules:[
          'aws-sdk',
        ]
      },
    environment: {
      PRIMARY_KEY: "id",
      TABLE_NAME: narutoTable.tableName,
    }
  });
    //permission for lambda to access the table
    narutoTable.grantReadWriteData(getShinobiLambdaFunction);




    const api = new LambdaRestApi(this, 'naruto-api', {
      restApiName: 'Naruto_Api',
      handler: getShinobiLambdaFunction,
      proxy: false,
    });

    const naruto = api.root.addResource('naruto');
    naruto.addMethod('GET');

    
  }
}
