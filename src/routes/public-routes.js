/* eslint-disable import/named */
// Routes in this module require authentication
import express from 'express';

import apiFunctions from '../server-controllers/api-functions';


const router = express.Router();

router.get('/', (req, res) => {
    res.render('indexlatest', { layout: 'learnsharda' });
});
router.get('/gallery', (req, res) => {
    console.log('gallery route hit')
    apiFunctions.viewGallery(false).then((galleryImages) => {
        console.log({ galleryImages })
        res.render('gallerylatest', { data: galleryImages, layout: 'learnsharda' });
    }).catch((error) => {
        console.log('eoor ', error)
        res.render('error', error);
    });
});
router.get('/transliteration', (req, res) => {
    res.render('transliteration', { layout: 'learnsharda' });
});
router.get('/learn', (req, res) => {
    res.redirect('https://karankraina.github.io/learning/main.html')
    // res.render('learnsharda', { layout: 'learnsharda' });
});
router.get('/gallery2', (req, res) => {
    apiFunctions.viewGallery(false).then((galleryImages) => {
        res.render('gallery', { data: galleryImages });
    }).catch((error) => {
        res.render('error', error);
    });
});

router.get('/aboutus', (req, res) => {
    res.render('about', { layout: 'learnsharda' });
});

router.get('/links', (req, res) => {
    apiFunctions.fetchLinks().then((linkData) => {
        console.log(linkData)
        res.render('linkspage', { data: linkData, layout: 'learnsharda' });
    }).catch((error) => {
        res.render('error', error);
    });
});
router.get('/contact', (req, res) => {
    res.render('contact');
});
router.get('/transliteration', (req, res) => {
    res.render('transliteration');
});
router.get('/lalded', (req, res) => {
    res.render('vaakhs/lalded');
});

router.get('/all-components', (req, res) => {
    res.render('maincomponents/index');
});

router.get('/login', (req, res) => {
    res.render('login', { layout: 'learnsharda' });
});

module.exports = router;
