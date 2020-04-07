/* eslint-disable import/named */
// Routes in this module require authentication
import express from 'express';


const router = express.Router();

router.get('/', (req, res) => {
  console.log('in auth routes')
  res.render('index');
});
router.get('/admin', (req, res) => {
  res.render('index');
});

module.exports = router;
