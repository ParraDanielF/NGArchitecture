const service = require('./management.service');

const getCostData = () => {
    return new Promise((resolve, reject) => {
        service.getCostData().then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });
}

exports.handler = function (event, context, callback) {
    context.callbackWaitsForEmptyEventLoop = false;
    let methodExecuted = null;

    console.log('[OPERATION]', event.operation);
    if (event.operation === 'getCostData') {
        methodExecuted = getCostData();//(event.data);
    }

    methodExecuted.then(res => {
        callback(null, res);
    }).catch(err => {

        /** build error response **/
        let errorResponse = {
            message: err.toString(),
            code: 400
        }
        callback(errorResponse);
    });
}