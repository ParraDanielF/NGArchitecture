const repository = require('../persistence/repository/patient.repository');
const service = {};

service.getPatientData = () => {
    return new Promise((resolve, reject) => {
        try {
            repository.getPatientData().then(res => {
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