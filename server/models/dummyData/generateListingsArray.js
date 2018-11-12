const faker = require('faker');

function generateDummyArray() {
  return new Promise((resolve, reject) => {
    var scaleListingsArray = [];
    for (var j = 0; j < 100000; j++) {
      var listing = {
        "hostFirstName": faker.name.firstName(),
        "neighbId": Math.floor(Math.random() * 15) + 1,
        "neighbDesc": faker.lorem.paragraph(),
        "gettingAroundDesc": faker.lorem.paragraph(),
        "listingLat": Number((Math.random() * 100).toFixed(6)),
        "listingLong": Number((Math.random() * 100).toFixed(6))
      }
      scaleListingsArray.push(listing)
    }
    if (scaleListingsArray.length !== 100000) {
      reject();
    } else {
      resolve(scaleListingsArray);
    }
  })
}

module.exports.generateDummyArray = generateDummyArray;