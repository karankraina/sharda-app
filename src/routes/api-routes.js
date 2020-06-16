/* eslint-disable import/named */
// Routes in this module require authentication
import express from 'express';
const formidable = require('formidable');

const router = express.Router();

import { uploadImage } from '../server-controllers/api-functions/contentful-module'
import { insertImageEntry, initiateDb, viewGallery } from '../server-controllers/api-functions/database-module'
import apiModule from '../server-controllers/api-functions'

router.get('/test1', (req, res) => {
  console.log('in test2')
  initiateDb().then(data => {
    console.log(data)
    res.send('index')
  })
});


router.get('/test2', (req, res) => {
  console.log('in test2')
  viewGallery().then(data => {
    console.log(data)
    res.render('gallery', { data })
  })
});

router.get('/get-gallery-posts', (req, res) => {
  const { id } = req.query
  apiModule.viewGallery(false).then(data => {
    if (!id) {
      res.status(200).send(data);
    } else {
      let filteredData = data.find(({ id: dbId }) => id == dbId) || {}
      res.status(200).send(filteredData);
    }

  }).catch(error => {
    res.status(500).send('error')
  })
});

router.post('/upload-image', (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    const { title, description, contributor, isactive } = fields
    uploadImage(files, title).then(data => {
      console.log(data)
      insertImageEntry({ title, description, contributor, isactive, publicUrl: data.publicUrl }).then(data => {
        console.log('DATABSE ENTRY SUCCESSFUL........', data)
        res.send('holaaaa')
      })

    }).catch(error => {
      console.log(error)
    })
  });
});

router.post('/toggle-image-status', (req, res, next) => {
  const { imageId } = req.body;
  apiModule.toggleImageStatus(imageId).then((galleryImages) => {
    console.log(galleryImages);
    res.render('upload', { layout: 'learnsharda', data: galleryImages });
  }).catch((error) => {
    res.render('error', error);
  });
});

module.exports = router;
