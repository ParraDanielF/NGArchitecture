const repository = require('../persistence/repository/finance.repository');
const service = {};

service.saveFinanceData = data => {
    return new Promise((resolve, reject) => {
        try {
            repository.saveFinanceData(data).then(res => {
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