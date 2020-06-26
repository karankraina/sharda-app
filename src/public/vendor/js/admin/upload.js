$(() => {
    $('.delete-button').on('click', function () {
        const imageId = $(this).attr('image-id');
        AsyncAjax('POST', '/api/toggle-image-status', { imageId })
            .then((data) => {
                console.log(data);
                console.log('Successs');
                location.reload();
            })
            .catch((error) => {
                console.log('ERRORERREOR');
                console.log(error);
            });
    });
});
