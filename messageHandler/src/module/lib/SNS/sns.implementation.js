var AWS = require('aws-sdk');
AWS.config.region = 'us-east-2';
var sns = new AWS.SNS();
let handler = {};

handler.sendMessage = message => {
    return new Promise((resolve, reject) => {

        var params = {
            Message: message, /* required */
            TopicArn: process.env.SNS_TOPIC
        };
        sns.publish(params, function (err, data) {
            if (err) reject(err.stack); // an error occurred
            else resolve(data);           // successful response
        });

    });
};

module.exports = handler;