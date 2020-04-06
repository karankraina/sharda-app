/* eslint-disable import/named */
// Routes in this module require authentication
import express from 'express';


const router = express.Router();

router.get('/test1', (req, res) => {
  res.send('index');
});
router.get('/profile', (req, res) => {
  res.send('profile');
});

module.exports = router;
