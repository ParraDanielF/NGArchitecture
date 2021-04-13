const repository = require('../persistence/repository/nn.repository');
const service = {};

service.functionName = () => {
    return new Promise((resolve, reject) => {
        try {
            repository.functionName().then(res => {
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