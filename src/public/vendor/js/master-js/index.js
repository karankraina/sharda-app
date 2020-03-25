// Custom function to make ajax calls simple.
function makeAjaxCall(endpointUrl, dataToBeSubmitted, callBackFunction) {
  $.ajax({
    url: endpointUrl,
    data: JSON.stringify(dataToBeSubmitted),
    contentType: "application/json",
    type: 'POST',
    success: function (response, err, e) {
      return callBackFunction(response, null)
    },
    error: function (err) {
      return callBackFunction(null, err.responseText ? JSON.parse(err.responseText) : err)
    }
  });
}

// Async ajax call

const AsyncAjax = (endpointUrl, dataToBeSubmitted) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: endpointUrl,
      data: JSON.stringify(dataToBeSubmitted),
      contentType: "application/json",
      type: 'POST',
      success: function (response, err, e) {
        resolve({response, error: null})
      },
      error: function (err) {
        reject({response: null, error: err })
      }
    });
  })
}