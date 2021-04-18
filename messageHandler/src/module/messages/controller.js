const service = require('./message.service');

const sendMessage = data => {
    return new Promise((resolve, reject) => {
        service.sendMessage(data.message).then(res => {
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
    if (event.operation === 'sendMessage') {
        methodExecuted = sendMessage(event.data);
    }

    methodExecuted.then(res => {
        callback(null, {status : 'delivered', res});
    }).catch(err => {

        /** build error response **/
        let errorResponse = {
            message: err.toString(),
            code: 400
        }
        callback(errorResponse);
    });
}