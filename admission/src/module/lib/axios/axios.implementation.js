let handler = {};
const axios = require('axios');

handler.callService = data => {
    return new Promise(async(resolve, reject) => {
        try {
            const serviceData = await axios.post(data.SERVICE_URL, data.payload);
            resolve(serviceData);
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = handler;