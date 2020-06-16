// Custom function to make ajax calls simple.
function makeAjaxCall(endpointUrl, dataToBeSubmitted, callBackFunction) {
    $.ajax({
        url: endpointUrl,
        data: JSON.stringify(dataToBeSubmitted),
        contentType: 'application/json',
        type: 'POST',
        success(response, err, e) {
            return callBackFunction(response, null);
        },
        error(err) {
            return callBackFunction(null, err.responseText ? JSON.parse(err.responseText) : err);
        },
    });
}

// Async ajax call

const AsyncAjax = (type, endpointUrl, dataToBeSubmitted=null) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: endpointUrl,
            data: JSON.stringify(dataToBeSubmitted),
            contentType: 'application/json',
            type,
            success(response) {
                resolve(response);
            },
            error(error) {
                reject(error);
            },
        });
    });
};
