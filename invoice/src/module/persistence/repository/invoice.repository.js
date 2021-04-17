const { callService } = require('../../lib/axios/axios.implementation');
const repository = {};

repository.getInvoiceData = () => {
    return new Promise(async(resolve, reject) => {
        try {
            if (process.env.USE_MOCK_DATA === 'true') {
                setTimeout(
                    function () {
                        const data = require('../mocks/data.json');
                        resolve(data);
                    }, 800);
            } else {
                const [costData, patientData, proceduresData] = await Promise.all([
                    callService({SERVICE_URL : process.env.COST_SERVICE, payload : {operation : 'getCostData'}}),
                    callService({SERVICE_URL : process.env.PATIENT_SERVICE, payload : {operation : 'getPatientData'}}),
                    callService({SERVICE_URL : process.env.CLINIC_HISTORY_SERVICE, payload : {operation : 'getPatientProcedures'}})
                ]);

                resolve({
                    costData : costData.data, 
                    patientData : patientData.data, 
                    proceduresData : proceduresData.data
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = repository;