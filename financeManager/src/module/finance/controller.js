const service = require('./finance.service');

const saveFinanceData = data => {
    return new Promise((resolve, reject) => {
        service.saveFinanceData(data).then(res => {
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
    if (event.operation === 'saveFinanceData') {
        methodExecuted = saveFinanceData(event.data);
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