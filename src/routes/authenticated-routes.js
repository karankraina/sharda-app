/* eslint-disable import/named */
// Routes in this module require authentication
import express from 'express';


const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;
