const repository = {};

repository.getPatientProcedures = () => {
    return new Promise((resolve, reject) => {
        try {
            if (process.env.USE_MOCK_DATA === 'true') {
                setTimeout(
                    function () {
                        const data = require('../mocks/data.json');
                        resolve(data);
                    }, 1000);
            } else {
                // TODO : Implement db connection use the code in lib/dynamoDB
            }
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = repository;