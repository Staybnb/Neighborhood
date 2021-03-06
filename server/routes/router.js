const router = require('express').Router();
const controller = require('../controllers/main');
const path = require('path');

// router.get('/', (req, res) => {res.send('Hello, world')})
// router.get('/listing', (req, res) => {res.send('Hello, listing')})
router.get('/listingdata', controller.getListingData)
router.get('/neighborhooddata', controller.getNeighbData)
router.get('/landmarkdata', controller.getLandmarkData)
router.get('/app.js', (req, res) => {
  res.redirect('https://s3.us-east-2.amazonaws.com/staybnb-neighborhood/app.js');
})
router.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
})

module.exports = router; 