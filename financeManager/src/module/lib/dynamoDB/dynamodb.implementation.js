/** libraries and dependencies section */
const AWS = require('aws-sdk');
const handler = {};

/** global objects and variables */
AWS.config.update({
    region: process.env.region
});
const services = {
    dynamo: new AWS.DynamoDB({
        apiVersion: '2012-10-08'
    })
}

handler.create = data => {
    return new Promise((resolve, reject) => {
        console.log('making the insert in DynamoDB ->[Finance]')
        const { id, timestamp, state } = data;
        let params = {
            TableName: process.env.TABLE_NAME,
            Item: {
                '_id': {
                    S: id
                },
                'timestamp': {
                    S: timestamp
                },
                'state': {
                    S: state
                }
            }
        };
        console.log('[DATA TO INSERT IN THE COLLECTION]', params)
        // Call DynamoDB to add the item to the table
        services.dynamo.putItem(params, function (err, response) {
            if (err) {
                reject(err);
            } else {
                resolve(response);
            }
        });
    });
}

module.exports = handler;
