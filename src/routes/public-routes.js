/* eslint-disable import/named */
// Routes in this module require authentication
import express from 'express';

import apiFunctions from '../server-controllers/api-functions';


const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});
router.get('/learn', (req, res) => {
    res.render('learnsharda', { layout: 'learnsharda' });
});
router.get('/gallery', (req, res) => {
    apiFunctions.viewGallery(false).then((galleryImages) => {
        res.render('gallery', { data: galleryImages });
    }).catch((error) => {
        res.render('error', error);
    });
});

router.get('/all-components', (req, res) => {
    res.render('maincomponents/index');
});

router.get('/login', (req, res) => {
    res.render('login');
});

module.exports = router;
