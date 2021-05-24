const repository = require('../persistence/repository/history.repository');
const service = {};

service.saveNewRegister = data => {
    return new Promise(async(resolve, reject) => {
        try {
            await repository.saveNewRegister({data});
            const id = data.result._id;
            const queryData = {
                _id : new Date().getMilliseconds().toString(),
                actionData : data.actions.data,
                date : data.date,
                procedureId : data.procedureId,
                medicalHeadquarterId : data.procedureId,
                professionalId : data.professionalId,
                userId : data.userId,
                result : {
                    [id] : { 'S' : data.result.description }
                }

            };
            await repository.saveNewRegister({data: queryData, table : process.env.TABLE_REPLICA});
            resolve({
                status : 'saved & propagated',
                code : 200
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = service;