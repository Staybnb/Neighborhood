const faker = require('faker');

var scaleListingsArray = [];

for (var i = 0; i < 1000; i++) {
  var listing = {
    "hostFirstName": faker.name.firstName(),
    "neighbId": Math.floor(Math.random() * 10) + 1,
    "neighbDesc": faker.lorem.sentence()
  }
  scaleListingsArray.push(listing)
}

// var listing2 = {
//   "listingId":1,
//   "hostFirstName":"Adélaïde",
//   "neighbId":13,
//   "neighbDesc":"Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.","gettingAroundDesc":"Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem."
// }

// module.exports.scaleListingsArray = scaleListingsArray;
