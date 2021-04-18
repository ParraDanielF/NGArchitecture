const repository = require('../persistence/repository/message.repository');
const service = {};

service.sendMessage = message => {
    return new Promise((resolve, reject) => {
        try {
            repository.sendMessage(message).then(res => {
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