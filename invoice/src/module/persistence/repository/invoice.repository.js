const { callService } = require('../../lib/Lambda/lambda.implementation');
const repository = {};

repository.getInvoiceData = () => {
    return new Promise((resolve, reject) => {
        try {
            if (process.env.USE_MOCK_DATA === 'true') {
                setTimeout(
                    function () {
                        const data = require('../mocks/data.json');
                        resolve(data);
                    }, 800);
            } else {
                const [costData, patientData, proceduresData] = await Promise.all([
                    callService({destination : process.env.COST_SERVICE, payload : {}}),
                    callService({destination : process.env.PATIENT_SERVICE, payload : {}}),
                    callService({destination : process.env.CLINIC_HISTORY_SERVICE, payload : {}})
                ]);

                resolve({
                    costData, 
                    patientData, 
                    proceduresData
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = repository;