/* eslint-disable import/named */
// Routes in this module require authentication
import express from 'express';

import apiModule from '../server-controllers/api-functions';

const router = express.Router();


router.get('/', (req, res) => {
    console.log('in auth routes');
    res.render('index');
});
router.get('/upload-image', (req, res) => {
    console.log(apiModule);
    apiModule.viewGallery(true).then((galleryImages) => {
        console.log(galleryImages);
        res.render('admin/manage-gallery', { layout: 'learnsharda', data: galleryImages });
    }).catch((error) => {
        res.render('error', error);
    });
});

router.get('/manage-sharda-lessons', (req, res) => {
    res.render('upload');
});

module.exports = router;
