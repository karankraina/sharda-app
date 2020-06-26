/* eslint-disable import/named */
// Routes in this module require authentication
import express from 'express';

import { uploadImage } from '../server-controllers/api-functions/contentful-module';
import { initiateDb, viewGallery } from '../server-controllers/api-functions/database-module';
import apiModule from '../server-controllers/api-functions';

const formidable = require('formidable');

const router = express.Router();

router.get('/test1', (req, res) => {
  console.log('in test2');
  initiateDb().then((data) => {
    console.log(data);
    res.send('index');
  });
});


router.get('/test2', (req, res) => {
  console.log('in test2');
  viewGallery().then((data) => {
    console.log(data);
    res.render('gallery', { data });
  });
});

router.get('/get-gallery-posts', (req, res) => {
  const { id } = req.query;
  apiModule.viewGallery(false).then((data) => {
    if (!id) {
      res.status(200).send(data);
    } else {
      const filteredData = data.find(({ id: dbId }) => { return id == dbId; }) || {};
      res.status(200).send(filteredData);
    }
  }).catch((error) => {
    res.status(500).send('error');
  });
});

router.post('/upload-image', (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    const {
      title, description, contributor, isactive,
    } = fields;
    uploadImage(files, title).then((data) => {
      console.log(data);
      apiModule.insertImageEntry({
        title, description, contributor, isactive, publicUrl: data.publicUrl,
      }).then((data) => {
        console.log('DATABSE ENTRY SUCCESSFUL........', data);
        res.send(data);
      });
    }).catch((error) => {
      console.log(error);
    });
  });
});

router.post('/toggle-image-status', (req, res, next) => {
  const { imageId } = req.body;
  apiModule.toggleImageStatus(imageId).then((galleryImages) => {
    console.log(galleryImages);
    // res.render('upload', { layout: 'learnsharda', data: galleryImages });
    res.status(200).send('success');
  }).catch((error) => {
    res.render('error', error);
  });
});

router.get('/get-lesson-data', (req, res) => {
  const { id } = req.query;
  apiModule.getLessonData(id).then((data) => {
    res.status(200).send({ data });
  }).catch((error) => {
    res.status(500).send('error');
  });
});

module.exports = router;
