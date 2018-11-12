var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/neighborhood');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('MongoDB connection has been established successfully')
});

// Define schemas + models:
var listingsSchema = new mongoose.Schema({
  _id: {type: String, required: true},
  hostFirstName: String,
  neighbId: Number,
  listingLat: Number,
  listingLong: Number,
  neighbDesc: String,
  gettingAroundDesc: String
});
var Listing = mongoose.model('Listing', listingsSchema);

var neighborhoodsSchema = new mongoose.Schema({
  id: Number,
  cityString: String,
  regionString: String,
  country: String,
  neighbName: String,
  feature1: String,
  feature2: String,
  feature3: String,
  feature4: String,
  feature5: String,
  feature6: String,
  feature7: String
})
var Neighborhood = mongoose.model('Neighborhood', neighborhoodsSchema)

var landmarksSchema = new mongoose.Schema({
  id: Number,
  landmarkName: String,
  landmarkLat: Number,
  landmarkLong: Number,
  distance: Number
})
var Landmark = mongoose.model('Landmark', landmarksSchema)

module.exports.db = db;
module.exports.Listing = Listing;
module.exports.Neighborhood = Neighborhood;
module.exports.Landmark = Landmark;

