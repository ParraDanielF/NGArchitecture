const repository = {};
const messageHandler = require('../../lib/SQS/sqs.implementation');

repository.sendMessage = message => {
    return new Promise((resolve, reject) => {
        try {
            if (process.env.USE_MOCK_DATA === 'true') {
                setTimeout(
                    function () {
                        const data = require('../mocks/data.json');
                        resolve(data);
                    }, 1000);
            } else {
                resolve(messageHandler.sendMessage(message))
            }
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = repository;