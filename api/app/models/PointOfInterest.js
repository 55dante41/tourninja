var mongoose = require('mongoose'),
    schema = mongoose.Schema;

var pointOfInterestSchema = {
  name: {type: String, required: true},
  latitude: {type: Number},
  longitude: {type: Number},
  googlePlaceId: {type: String},
  foursquareVenueId: {type: String},
  themes: [{type: String}],
  locality: {type: String, required: true},
  city: {type: String, required: true},
  state: {type: String, required: true},
  country: {type: String, required: true}
};

module.exports = mongoose.model('PointOfInterest', pointOfInterestSchema);
