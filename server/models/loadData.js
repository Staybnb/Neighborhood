const async = require('async');
const models = require('./models.js');
// const generatedListings = require('./dummyData/generateListingsData.js');
const generatedLandmarks = require('./dummyData/generateLandmarksData.js');
const Listing = models.listingSchema;
const Neighborhood = models.neighborhoodSchema;
const Landmark = models.landmarkSchema;

// Import arrays of data

// const listings = generatedListings.listingsData;
// const scaleListingsArrays = generatedListings.scaleListingsArray;
const neighbs = require('./dummyData/neighbsData.js').neighbsArray;
const landmarks = generatedLandmarks.landmarksData;

// GENERATE LISTINGS DATA

///////////////////// LISTINGS DATA ////////////////////////////
//// Generate 100 points within a polygon of Central London ////

const randomPointsOnPolygon = require('random-points-on-polygon');
const turf = require('turf');

var polygon = turf.polygon([[
  [-.2451, 51.5194], [-.1960, 51.5485],
  [-.1040, 51.5485], [-.0700, 51.5331],
  [-.0632, 51.5132], [-.0748, 51.5089],
  [-.1095, 51.5128], [-.1218, 51.5108],
  [-.1281, 51.4972], [-.1428, 51.4867],
  [-.1665, 51.4869], [-.1850, 51.4811],
  [-.2451, 51.5194]
]]);

let numberOfPoints = 10000000;
// var points = randomPointsOnPolygon(numberOfPoints, polygon);

let listingsCoords = [];

// for (let i = 0; i < points.length; i++) {
//   // reverse order to lat-long instead long-lat
//   let latLong = [points[i].geometry.coordinates[1], points[i].geometry.coordinates[0]]
//   listingsCoords.push(latLong)
// }

////// Add the points onto the listingsData from Mockaroo //////

// let listingsData = require('./listingsData_no_coords').listingsArray;
// let { scaleListingsArray } = require('./scaleData.js');

const faker = require('faker');
var { fork } = require('child_process');

Listing.sync({force: true})
.then(() => {

  // const compute = fork('generateListingsData.js');
  // compute.send('start');
  // compute.on('message', (process) => {
  //   console.log('process ', process)
  // })

  async.series([
    function(callback) {

      function generate() {
        return new Promise((resolve) => {
          var scaleListingsArray = [];
          for (var j = 0; j < 200000; j++) {
            var listing = {
              "hostFirstName": faker.name.firstName(),
              "neighbId": Math.floor(Math.random() * 10) + 1,
              "neighbDesc": faker.lorem.sentence()
              // "listingLat": listingsCoords[j][0],
              // "listingLong": listingsCoords[j][1]
            }
            scaleListingsArray.push(listing)
          }
          resolve(scaleListingsArray);
        })
      }

      async function insert() {
        var result = await generate();
        Listing.bulkCreate(result); 
        console.log('ONEONEOENEONEOEENOE');
      }
      
      insert();
      return callback(null) 
    }, 

    function(callback) {
      var scaleListingsArray = [];
      for (var j = 0; j < 200000; j++) {
        var listing = {
          "hostFirstName": faker.name.firstName(),
          "neighbId": Math.floor(Math.random() * 10) + 1,
          "neighbDesc": faker.lorem.sentence(),
          // "listingLat": listingsCoords[j][0],
          // "listingLong": listingsCoords[j][1]
        }
        scaleListingsArray.push(listing)
        console.log(j)
      }
      Listing.bulkCreate(scaleListingsArray);  
      console.log('Two');
      return callback(null) 
    },
    function(callback) {
      var scaleListingsArray = [];
      for (var j = 0; j < 200000; j++) {
        var listing = {
          "hostFirstName": faker.name.firstName(),
          "neighbId": Math.floor(Math.random() * 10) + 1,
          "neighbDesc": faker.lorem.sentence(),
          // "listingLat": listingsCoords[j][0],
          // "listingLong": listingsCoords[j][1]
        }
        scaleListingsArray.push(listing)
      }
      Listing.bulkCreate(scaleListingsArray);  
      console.log('Three');
      return callback(null) 
    }, 
    function(callback) {
      var scaleListingsArray = [];
      for (var j = 0; j < 200000; j++) {
        var listing = {
          "hostFirstName": faker.name.firstName(),
          "neighbId": Math.floor(Math.random() * 10) + 1,
          "neighbDesc": faker.lorem.sentence(),
          // "listingLat": listingsCoords[j][0],
          // "listingLong": listingsCoords[j][1]
        }
        scaleListingsArray.push(listing)
      }
      Listing.bulkCreate(scaleListingsArray);  
      console.log('Four');
      return callback(null) 
    },
    function(callback) {
      var scaleListingsArray = [];
      for (var j = 0; j < 200000; j++) {
        var listing = {
          "hostFirstName": faker.name.firstName(),
          "neighbId": Math.floor(Math.random() * 10) + 1,
          "neighbDesc": faker.lorem.sentence(),
          // "listingLat": listingsCoords[j][0],
          // "listingLong": listingsCoords[j][1]
        }
        scaleListingsArray.push(listing)
      }
      Listing.bulkCreate(scaleListingsArray);  
      return callback(null) 
    },
     function(callback) {
      var scaleListingsArray = [];
      for (var j = 0; j < 200000; j++) {
        var listing = {
          "hostFirstName": faker.name.firstName(),
          "neighbId": Math.floor(Math.random() * 10) + 1,
          "neighbDesc": faker.lorem.sentence(),
          // "listingLat": listingsCoords[j][0],
          // "listingLong": listingsCoords[j][1]
        }
        scaleListingsArray.push(listing)
      }
      Listing.bulkCreate(scaleListingsArray); 
      console.log('Five'); 
      return callback(null) 
    },
    
  ], (err, results) => {
    if (err) console.log(err);
  })

})
.catch((err) => {
  console.error(err);
})
  


Neighborhood.sync({force: true})
.then(() => {
  Neighborhood.bulkCreate(neighbs)
})
.catch((err) => {
  console.error(err);
})

landmarks.then((results) => {
  Landmark.sync({force: true})
  .then(() => {
    Landmark.bulkCreate(results)
  })
  .catch((err) => {
    console.error(err);
  })
})

