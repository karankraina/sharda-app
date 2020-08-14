/* eslint-disable import/named */
// Routes in this module require authentication
import express from 'express';

import apiModule from '../server-controllers/api-functions';

const router = express.Router();


router.get('/', (req, res) => {
    console.log('in auth routes');
    res.render('admin', { layout: 'admin' });
});
router.get('/upload-image', (req, res) => {
    apiModule.viewGallery(true).then((galleryImages) => {
        console.log(galleryImages);
        res.render('admin/manage-gallery', { layout: 'admin', data: galleryImages });
    }).catch((error) => {
        console.log(error)
        res.render('error', error);
    });
});

router.get('/manage-sharda-lessons', (req, res) => {
    res.render('upload');
});

module.exports = router;
