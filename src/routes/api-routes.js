/* eslint-disable import/named */
// Routes in this module require authentication
import express from 'express';
const formidable = require('formidable');

const router = express.Router();

import { uploadImage } from '../server-controllers/api-functions/contentful-module'

router.get('/test1', (req, res) => {
  console.log('in test2')
  res.send('index')
});

router.post('/upload-image', (req, res, next) => {
  console.log('Inside Route....')
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    const { title, description, contributor, isactive } = fields
    console.log({
      fields,
      files
    })
console.log('calling function')
uploadImage(files, title).then(data => {
      console.log('upload complete')
      console.log(data) 
      res.send('holaaaa')
    }).catch(error => {
      console.log(error)
    })

    imgpath = files.imageFile.path;
    ({ fileName } = fields);
    // brandId = fields.brandId;
    brandname = fields.brandname.replace('/', '&#x2F');
    contentType = `image/${imgpath.split('.').pop()}`;

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
    sdkClient.getSpace(spaceId).then((space) => {
      return space.createUpload({
        file: fs.createReadStream(imgpath),
        contentType,
        fileName,
      })
        .then((upload) => {
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
              cfClient.getAsset(asset.sys.id)
                .then((response) => {
                  try {
                    request({
                      // url: `${API_URL}/api/uploadbrandlogo/${brandId}`,
                      url: `${API_URL}/api/uploadbrandlogo/${brandname}`,
                      method: 'PUT',
                      headers: {
                        'content-type': 'application/json',
                        Authorization: auth,
                      },
                      json: { brandurl: response.fields.file.url },
                    }, (error, resp) => {
                      if (!error && resp.statusCode === 200) {
                        res.redirect('/adminupdateproducts');
                      } else {
                        next(error);
                      }
                    });
                  } catch (e) {
                    next(e);
                  }
                }).catch((err2) => {
                  res.send(err2);
                });
            });
        })
        .catch((err2) => {
          next(err2);
        });
    })
      .catch((err2) => {
        next(err2);
      });
  });
});

module.exports = router;
