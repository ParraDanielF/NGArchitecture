const { callService } = require('../../lib/axios/axios.implementation');
const repository = {};

repository.newAdmission = incomingData => {
    return new Promise(async(resolve, reject) => {
        try {
            if (process.env.USE_MOCK_DATA === 'true') {
                setTimeout(
                    function () {
                        const data = require('../mocks/data.json');
                        resolve(data);
                    }, 1000);
            } else {
                resolve(await callService({SERVICE_URL : process.env.PROCEDURES_SERVICE, payload : {operation : 'saveProcedure', data: incomingData}}))
            }
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = repository;