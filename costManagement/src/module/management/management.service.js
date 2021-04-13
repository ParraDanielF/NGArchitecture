const repository = require('../persistence/repository/management.repository');
const service = {};

service.getCostData = () => {
    return new Promise((resolve, reject) => {
        try {
            repository.getCostData().then(res => {
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