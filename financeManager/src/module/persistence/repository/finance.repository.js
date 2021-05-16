const repository = {};
const persistenceImplementationHanlder = require('../../lib/dynamoDB/dynamodb.implementation');

repository.saveFinanceData = data => {
    return new Promise((resolve, reject) => {
        try {
            if (process.env.USE_MOCK_DATA === 'true') {
                setTimeout(
                    function () {
                        const data = require('../mocks/data.json');
                        resolve(data);
                    }, 1000);
            } else {
                return(await persistenceImplementationHanlder.create(data))
            }
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = repository;