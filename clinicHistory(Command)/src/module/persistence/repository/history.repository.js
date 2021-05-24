const repository = {};
const persistenceImplementationHandler = require('../../lib/dynamoDB/dynamodb.implementation');
const messageHandler = require('../../lib/SQS/sqs.implementation');

repository.saveNewRegister = incomingData => {
    return new Promise(async(resolve, reject) => {
        try {
            if (process.env.USE_MOCK_DATA === 'true') {
                setTimeout(
                    function () {
                        const data = require('../mocks/data.json');
                        resolve(data);
                    }, 1000);
            } else {
                resolve(await persistenceImplementationHandler.create(incomingData));
            }
        } catch (error) {
            reject(error);
        }
    });
};

repository.sendMessage = message => {
    return new Promise(async(resolve, reject) => {
        try {
            if (process.env.USE_MOCK_DATA === 'true') {
                setTimeout(
                    function () {
                        resolve({
                            status : 'sended',
                            target : 'synchronization-sqs'
                        });
                    }, 1000);
            } else {
                resolve(await messageHandler.sendMessage(message))
            }
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = repository;