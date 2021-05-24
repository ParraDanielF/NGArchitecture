const repository = require('../persistence/repository/history.repository');
const service = {};

service.saveNewRegister = data => {
    return new Promise(async(resolve, reject) => {
        try {
            await repository.saveNewRegister(data);
            await repository.sendMessage(JSON.stringify(data));
            resolve({
                status : 'saved & propagated',
                code : 200
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = service;