const repository = require('../persistence/repository/history.repository');
const service = {};

service.saveNewRegister = data => {
    return new Promise((resolve, reject) => {
        try {
            repository.saveNewRegister(data).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = service;