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
//// Generate 10000000 points within a polygon of Central London ////

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

// let numberOfPoints = 10000000;
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

function insertAsync(callback) {
  var totalAdded = 0;
  function generate() {
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
    return scaleListingsArray;
  }
    
  function insert(array) {
    return new Promise((resolve, reject) => {
      Listing.bulkCreate(array)
        .then(() => {
          console.log('RAM usage:', process.memoryUsage().heapUsed/1000000);
          totalAdded += 200000;
          console.log('Current total records:', totalAdded);
          resolve();
        })
        .catch((error) => {
          reject(error);
        })
    })
  }

  async function initialize() {
    for (var i = 0; i < 2; i++) {
      var listingArray = generate()
      await insert(listingArray);
    }
    callback();
  }
  initialize(); 
}

Listing.sync({force: true})
.then(() => {
  insertAsync(() => {
    console.log('Listing table successfully populated');
  });
})
.catch((err) => {
  console.error(err);
})

console.log('after or before?');

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



// function insertSync() {
//   console.log(process.memoryUsage().heapUsed/1000000);
//   var scaleListingsArray = [];
//   for (var j = 0; j < 200000; j++) {
//     var listing = {
//       "hostFirstName": faker.name.firstName(),
//       "neighbId": Math.floor(Math.random() * 10) + 1,
//       "neighbDesc": faker.lorem.sentence(),
//       "listingLat": listingsCoords[j][0],
//       "listingLong": listingsCoords[j][1]
//     }
//     scaleListingsArray.push(listing)

//   }
//   Listing.bulkCreate(scaleListingsArray).then(() => {console.log('Added 200,000')})  
//   return;
// }
