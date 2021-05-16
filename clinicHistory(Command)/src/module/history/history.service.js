const repository = require('../persistence/repository/history.repository');
const service = {};

service.getPatientProcedures = () => {
    return new Promise((resolve, reject) => {
        try {
            repository.getPatientProcedures().then(res => {
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