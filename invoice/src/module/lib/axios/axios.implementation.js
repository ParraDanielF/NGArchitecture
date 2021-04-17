let handler = {};
const axios = require('axios');

handler.callService = data => {
    return new Promise(async(resolve, reject) => {
        try {
            resolve(await axios.post(data.SERVICE_URL, data.payload));
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = handler;