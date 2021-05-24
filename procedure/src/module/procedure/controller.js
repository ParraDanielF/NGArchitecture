const service = require('./procedure.service');

const getProcedures = () => {
    return new Promise((resolve, reject) => {
        service.getProcedures().then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });
}

const saveProcedure = data => {
    return new Promise((resolve, reject) => {
        service.saveProcedure(data).then(res => {
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
    if (event.operation === 'getProcedures') {
        methodExecuted = getProcedures();//(event.data);
    }
    if (event.operation === 'saveProcedure') {
        methodExecuted = saveProcedure(event.data);
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