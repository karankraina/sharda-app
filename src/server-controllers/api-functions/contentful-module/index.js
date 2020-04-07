const contentful = require('contentful');
const sdk = require('contentful-management');

export const uploadImage = (file, title) => {
  console.log('111111111111111111')
  const imgPath = file.imageFile.path;
  
  const contentType = `image/${imgpath.split('.').pop()}`;

  const spaceId = process.env.CONTENTFUL_SPACEID;
  const accessToken = process.env.CONTENTFUL_PERSONAL_TOKEN;
  const cfClient = contentful.createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: process.env.CONTENTFUL_SPACEID,
    // This is the access token for this space.
    // Normally you get both ID and the token in the Contentful web app
    accessToken: process.env.CONTENTFUL_ACCESSTOKEN,
  });
  const sdkClient = sdk.createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    spaceId,
    // This is the access token for this space.
    // Normally you get both ID and the token in the Contentful web app
    accessToken,
  });
  return new Promise((resolve, reject) => {
    sdkClient.getSpace(spaceId).then((space) => {
      space.createUpload({
        file: fs.createReadStream(imgpath),
        contentType,
        title,
      })
        .then((upload) => {
          console.log('222222222222')
          return space.createAsset({
            fields: {
              title: {
                'en-US': fileName,
              },
              file: {
                'en-US': {
                  fileName,
                  contentType,
                  uploadFrom: {
                    sys: {
                      type: 'Link',
                      linkType: 'Upload',
                      id: upload.sys.id,
                    },
                  },
                },
              },
            },
          })
            .then((asset) => {
              return asset.processForLocale('en-US', { processingCheckWait: 2000 });
            })
            .then((asset) => {
              return asset.publish();
            })
            .then((asset) => {
              console.log('333333333333333333')
              cfClient.getAsset(asset.sys.id).then((response) => {
                console.log('44444444444444444444', response)
                  resolve({publicUrl: response.fields.file.url, error: null})
                }).catch((err2) => {
                  reject({publicUrl: null, error: err2})
                });
            });
        })
        .catch((err2) => {
          reject({publicUrl: null, error: err2});
        });
    })
      .catch((err2) => {
        reject({publicUrl: null, error: err2});
      });
  })

}