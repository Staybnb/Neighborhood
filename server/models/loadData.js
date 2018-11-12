const async = require('async');
const models = require('./models.js');
const faker = require('faker');
var { fork } = require('child_process');
const generatedLandmarks = require('./dummyData/generateLandmarksData.js');
const neighbs = require('./dummyData/neighbsData.js').neighbsArray;
// let listingsData = require('./listingsData_no_coords').listingsArray;
const Listing = models.listingSchema;
const Neighborhood = models.neighborhoodSchema;
const Landmark = models.landmarkSchema;
const landmarks = generatedLandmarks.landmarksData;

var totalAdded = 0;

function insertAsync(callback) {

  function generateDummyArray() {
    return new Promise((resolve, reject) => {
      var scaleListingsArray = [];
      for (var j = 0; j < 200000; j++) {
        var listing = {
          "hostFirstName": faker.name.firstName(),
          "neighbId": Math.floor(Math.random() * 15) + 1,
          "neighbDesc": faker.lorem.sentence(),
          "gettingAroundDesc": faker.lorem.sentence()
          // "listingLat": listingsCoords[j][0],
          // "listingLong": listingsCoords[j][1]
        }
        scaleListingsArray.push(listing)
      }
      if (scaleListingsArray.length !== 200000) {
        reject();
      } else {
        resolve(scaleListingsArray);
      }
    })
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
      var listingArray = await generateDummyArray()
      await insert(listingArray);
    }
    callback();
  }
  initialize(); 
}

// Sequelize models insertion:
Listing.sync({force: true})
.then(() => {
  insertAsync(() => {
    console.log('Listing table populated with ' + totalAdded + ' records');
  });
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
