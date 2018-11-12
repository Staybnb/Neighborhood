const async = require('async');
const { generateDummyArray } = require('./dummyData/generateListingsArray')
const generatedLandmarks = require('./dummyData/generateLandmarksData.js');
const neighbs = require('./dummyData/neighbsData.js').neighbsArray;
const { Listing } = require('./../../database/mongoDB/index.js');

var totalAdded = 0;

function insertAsyncListing(callback) {
    
  function insertRecs(array) {
    return new Promise((resolve, reject) => {
      Listing.collection.insert(array)
    })
  }

  async function initialize() {
    console.log('****** Begin Data Injection ******')
    var begin = Date.now();
    for (var i = 0; i < 2; i++) {
      var listingArray = await generateDummyArray()
      await insertRecs(listingArray);
    }
    var end = Date.now();
    var timeSpent = ((end - begin) / 1000) / 60;
    callback(timeSpent);
  }
  initialize(); 
}

console.log('LISTINGS TO BE ADDED:', listingArray)
insertAsyncListing();

