const repository = require('../persistence/repository/invoice.repository');
const service = {};

service.getInvoiceData = () => {
    return new Promise((resolve, reject) => {
        try {
            repository.getInvoiceData().then(res => {
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