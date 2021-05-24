const repository = require('../persistence/repository/admission.repository');
const service = {};

service.newAdmission = data => {
    return new Promise((resolve, reject) => {
        try {
            repository.newAdmission(data).then(res => {
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