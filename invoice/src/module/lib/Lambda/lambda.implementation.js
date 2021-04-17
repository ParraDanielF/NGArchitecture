var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
var lambda = new AWS.Lambda();
let handler = {};

handler.callService = data => {
    return new Promise((resolve, reject) => {

        const params = {
            FunctionName: data.destination, // the lambda function we are going to invoke
            InvocationType: 'RequestResponse',
            LogType: 'Tail',
            Payload: JSON.stringify(data.payload) //the list of files that we want to get
        };
        
        lambda.invoke(params, (err, result) => {
            if (err) {
                reject(err);
            } else {
                if(result['StatusCode'] !== 200){
                    reject(result['stack']);
                }
                
                resolve(result);
            }
        });

    });
};

module.exports = handler;