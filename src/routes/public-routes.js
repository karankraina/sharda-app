/* eslint-disable import/named */
// Routes in this module require authentication
import express from 'express';


const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});
router.get('/all-components', (req, res) => {
  res.render('maincomponents/index');
});

router.get('/login', (req, res) => {
  res.render('login');
});

module.exports = router;
