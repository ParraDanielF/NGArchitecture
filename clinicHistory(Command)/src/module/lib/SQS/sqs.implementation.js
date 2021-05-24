var AWS = require('aws-sdk');
AWS.config.region = 'us-east-2';
var sqs = new AWS.SQS();
let handler = {};

handler.sendMessage = message => {
    return new Promise((resolve, reject) => {
        var params = {
            MessageBody: message, /* required */
            QueueUrl: process.env.QUEUE_URL, /* required */
            DelaySeconds: 0,

        };
        sqs.sendMessage(params, function (err, data) {
            if (err) reject(err.stack); // an error occurred
            else resolve(data);           // successful response
        });

    });
};

module.exports = handler;