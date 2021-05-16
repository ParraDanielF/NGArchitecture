const repository = require('../persistence/repository/procedure.repository');
const service = {};

service.getProcedures = () => {
    return new Promise((resolve, reject) => {
        try {
            repository.getProcedures().then(res => {
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