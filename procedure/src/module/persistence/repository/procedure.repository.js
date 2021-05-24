const repository = {};

repository.getProcedures = () => {
    return new Promise((resolve, reject) => {
        try {
            if (process.env.USE_MOCK_DATA === 'true') {
                setTimeout(
                    function () {
                        const data = require('../mocks/data.json');
                        resolve(data.get);
                    }, 1000);
            } else {
                const data = require('../mocks/data.json');
                resolve(data.save);
            }
        } catch (error) {
            reject(error);
        }
    });
};

repository.saveProcedure = data => {
    return new Promise((resolve, reject) => {
        try {
            if (process.env.USE_MOCK_DATA === 'true') {
                setTimeout(
                    function () {
                        const data2 = require('../mocks/data.json');
                        resolve(data2.save);
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