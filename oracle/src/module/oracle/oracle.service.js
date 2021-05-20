const repository = require('../persistence/repository/oracle.repository');
const service = {};

service.validateTransaction = data => {
    return new Promise((resolve, reject) => {
        try {
            repository.validateTransaction(data).then(res => {
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