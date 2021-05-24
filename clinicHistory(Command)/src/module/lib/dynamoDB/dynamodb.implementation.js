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

handler.create = ({data, table}) => {
    return new Promise((resolve, reject) => {
        console.log('making the insert in DynamoDB ->[ClinicHistory]')
        const medicalHeadquarterId = parseInt(data.medicalHeadquarterId);
        const procedureId = parseInt(data.procedureId);
        const professionalId = parseInt(data.professionalId);
        let params = {};
        
        if (table === undefined) {
            const { _id, userId, date, result, actions } = data;
            params = {
                TableName: process.env.TABLE_NAME,
                Item: {
                    '_id': {
                        S: _id
                    },
                    "userId": {
                        S: userId
                    },
                    "date": {
                        S: date
                    },
                    "procedureId": {
                        N: procedureId.toString()
                    },
                    "medicalHeadquarterId": {
                        N: medicalHeadquarterId.toString()
                    },
                    "professionalId": {
                        N: professionalId.toString()
                    },
                    "result": {
                        M: {
                            "_id": {
                                S: result._id
                            },
                            "description": {
                                S: result.description
                            }
                        }
                    },
                    "actions": {
                        M: {
                            "data": {
                                S: actions.data || ''
                            }
                        }
                    }
                }
            };
        } else {
            const { _id, userId, date, result, actionData } = data;
            params = {
                TableName: table,
                Item: {
                    "id" : {
                        S : _id
                    },
                    "userId": {
                        S: userId
                    },
                    "date": {
                        S: date
                    },
                    "procedureId": {
                        N: procedureId.toString()
                    },
                    "medicalHeadquarterId": {
                        N: medicalHeadquarterId.toString()
                    },
                    "professionalId": {
                        N: professionalId.toString()
                    },
                    "result": {
                        S : JSON.stringify(result)
                    },
                    "actionData": {
                        S: actionData
                    }
                }
            };
        }
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