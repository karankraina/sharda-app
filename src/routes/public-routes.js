/* eslint-disable import/named */
// Routes in this module require authentication
import express from 'express';


const router = express.Router();

import { getAllGalleryPosts } from '../server-controllers/api-functions'

router.get('/', (req, res) => {
  res.render('index');
});
router.get('/gallery', (req, res) => {
  getAllGalleryPosts().th en(data => {
    console.log(data)
      res.render('gallery', { data });
      
  }).catch(error => {
    res.render('error');
  })

});

router.get('/all-components', (req, res) => {
  res.render('maincomponents/index');
});

router.get('/login', (req, res) => {
  res.render('login');
});

module.exports = router;
